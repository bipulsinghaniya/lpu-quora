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








// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
//   tls: {
//     rejectUnauthorized: false,
//   },
// });


// // 🔍 ADD THIS BLOCK RIGHT HERE ⬇️
// transporter.verify((err, success) => {
//   if (err) {
//     console.error("SMTP VERIFY FAILED ❌", err.message);
//   } else {
//     console.log("SMTP READY ✅");
//   }
// });

// const sendEmail = async (to, link) => {
//   console.log("🟡 sendEmail() CALLED");
//   console.log("📧 TO:", to);
//   console.log("🔗 LINK:", link);

//   try {
//     const info = await transporter.sendMail({
//       from: `"LPU Quora" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: "Verify your email",
//       html: `<a href="${link}">Verify Email</a>`,
//     });

//     console.log("✅ EMAIL SENT:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("❌ EMAIL FAILED:", err.message);
//     throw err;
//   }
// };

// module.exports = sendEmail;





////////////////// trap 


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,   // sandbox.smtp.mailtrap.io
  port: Number(process.env.MAILTRAP_PORT), // 2525
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// ✅ SMTP CHECK (VERY IMPORTANT)
transporter.verify((err) => {
  if (err) {
    console.error("SMTP VERIFY FAILED ❌", err.message);
  } else {
    console.log("SMTP READY ✅ (Mailtrap)");
  }
});

const sendEmail = async (to, link) => {
  console.log("🟡 sendEmail() CALLED");
  console.log("📧 TO:", to);
  console.log("🔗 LINK:", link);

  const info = await transporter.sendMail({
    from: `"LPU Quora" <noreply@lpuquora.com>`,
    to,
    subject: "Verify your email",
    html: `
      <h3>Email Verification</h3>
      <p>Click the link below to verify your account:</p>
      <a href="${link}">${link}</a>
    `,
  });

  console.log("✅ EMAIL SENT:", info.messageId);
  return info;
};

module.exports = sendEmail;








