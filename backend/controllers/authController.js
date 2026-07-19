const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const redisClient = require("../config/redis"); 


/* ======================
   REGISTER
   ====================== */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email is already registered"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({
//       message: "Registration successful"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Registration failed"
//     });
//   }
// };





exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

  res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});


  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Login failed"
    });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔹 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 🔹 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }


    
    // 🔹 3. Prevent multiple OTP requests
 const cooldown = await redisClient.get(`otp_cooldown:${email}`);

if (cooldown) {
  return res.status(400).json({
    message: "Please wait 30 seconds before requesting again"
  });
}

// set cooldown
await redisClient.set(`otp_cooldown:${email}`, "1", { EX: 30 });




    // 🔹 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 5. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔹 6. Store in Redis
    await redisClient.set(
      `otp:${email}`,
      JSON.stringify({
        name,
        email,
        hashedPassword,
        otp,
      }),
      { EX: 600 } // 10 minutes
    );

    console.log("OTP stored:", otp);

    // 🔹 7. Send email (Brevo)
    await sendEmail({
      email,
      subject: "Verify your email",
      html: `
        <div style="font-family:sans-serif; max-width:400px; margin:auto; padding:20px;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="text-align:center;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    // 🔹 8. Response
    res.status(200).json({
      message: "OTP sent to your email"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};




exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = await redisClient.get(`otp:${email}`);

    if (!data) {
      return res.status(400).json({
        message: "OTP expired or not found"
      });
    }

    const parsed = JSON.parse(data);

    if (parsed.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    await User.create({
      name: parsed.name,
      email: parsed.email,
      password: parsed.hashedPassword,
    });

    await redisClient.del(`otp:${email}`);

    res.json({
      message: "Account created successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Verification failed"
    });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      if (user.authProvider === 'local' && !user.googleId) {
        user.googleId = googleId;
        user.avatar = avatar;
        await user.save();
      }
      
      const jwtToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        authProvider: 'google',
      });

      const jwtToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid Google Token' });
  }
};