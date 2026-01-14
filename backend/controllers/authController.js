// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // exports.register = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   const hashed = await bcrypt.hash(password, 10);
// //   await User.create({ name, email, password: hashed });
// //   res.send("Registered");
// // };
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 🔍 Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email is already registered"
//       });
//     }

//     // ✅ Create new user
//     await User.create({ name, email, password });

//     res.status(201).json({
//       message: "Registration successful"
//     });

//   } catch (err) {
//     console.error(err);

//     // 🔴 MongoDB duplicate key safety (extra protection)
//     if (err.code === 11000) {
//       return res.status(400).json({
//         message: "Email is already registered"
//       });
//     }

//     res.status(500).json({
//       message: "Registration failed"
//     });
//   }
// };




// exports.login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(401).send("Invalid");

//   const ok = await bcrypt.compare(req.body.password, user.password);
//   if (!ok) return res.status(401).send("Invalid");

//   const token = jwt.sign(
//     { _id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({ token, role: user.role });
// };



///////////////////////////////////////////////////////


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ======================
   REGISTER
   ====================== */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};

/* ======================
   LOGIN
   ====================== */
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
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Login failed"
    });
  }
};
