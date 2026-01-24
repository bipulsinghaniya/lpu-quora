

// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// /* ======================
//    REGISTER
//    ====================== */
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

// /* ======================
//    LOGIN
//    ====================== */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password"
//       });
//     }

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid email or password"
//       });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//   res.json({
//   token,
//   user: {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   },
// });


//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Login failed"
//     });
//   }
// };




////////////// mai 














const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


/* ======================
   REGISTER
   ====================== */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     // if (existingUser) {
//     //   return res.status(400).json({ message: "Email is already registered" });
//     // }


//     if (existingUser && existingUser.isVerified) {
//   return res.status(400).json({ message: "Email is already registered" });
// }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🔐 generate token
//     const emailToken = crypto.randomBytes(32).toString("hex");

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       isVerified: false,
//       emailToken,
//       emailTokenExpiry: Date.now() + 10 * 60 * 1000
//     });


//     const verifyLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

//     await sendEmail(email, verifyLink);

//     res.status(201).json({
//       message: "Registration successful. Please verify your email."
//     });

//   } catch (err) {
//   console.error("REGISTER ERROR 👉", err);
//   res.status(500).json({
//     error: err.message
//   });
// }

// };





exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // 🚫 Case 1: Already verified → block
    if (user && user.isVerified) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }

    // 🔐 generate token
    const emailToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    // ♻️ Case 2: Exists but NOT verified → update token
    if (user && !user.isVerified) {
      user.emailToken = emailToken;
      user.emailTokenExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();
    } 
    // 🆕 Case 3: New user
    else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        emailToken,
        emailTokenExpiry: Date.now() + 10 * 60 * 1000
      });
    }

    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

    // ✅ ALWAYS await
  // ✅ FIXED CODE (put this in authController.js)
try {
  await sendEmail(email, verifyLink);
} catch (emailErr) {
  console.error("EMAIL ERROR 👉", emailErr.message);
  // ❗ DO NOT throw error
}

return res.status(201).json({
  message: "Registration successful. Please verify your email."
});


  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    return res.status(500).json({
      message: "Registration failed"
    });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 🔐 CHECK EMAIL VERIFICATION HERE ⬇️
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before login"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT
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
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};




exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      emailToken: req.params.token,
      emailTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    user.isVerified = true;
    user.emailToken = undefined;
    user.emailTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};