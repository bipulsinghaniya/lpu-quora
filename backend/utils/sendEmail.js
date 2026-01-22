// const nodemailer = require("nodemailer");

// const sendEmail = async (to, link) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: `"LPU Quora" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Verify your email",
//     html: `
//       <h3>Email Verification</h3>
//       <p>Click the link below to verify your email:</p>
//       <a href="${link}">Verify Email</a>
//       <p>This link expires in 10 minutes.</p>
//     `
//   });
// };

// module.exports = sendEmail;










const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, link) => {
  console.log("🟡 sendEmail() CALLED");
  console.log("📧 TO:", to);
  console.log("🔗 LINK:", link);
  console.log("👤 EMAIL_USER:", process.env.EMAIL_USER);

  try {
    const info = await transporter.sendMail({
      from: `"LPU Quora" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${link}">${link}</a>
        <p>This link expires in 10 minutes.</p>
      `,
    });

    console.log("✅ EMAIL SENT:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ NODEMAILER ERROR:", err);
    throw err; // IMPORTANT: fail registration if mail fails
  }
};

module.exports = sendEmail;
