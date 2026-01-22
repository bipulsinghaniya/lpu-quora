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

const sendEmail = async (to, link) => {
  console.log("🟡 sendEmail() CALLED");
  console.log("📧 TO:", to);
  console.log("🔗 LINK:", link);
  console.log("👤 EMAIL_USER:", process.env.EMAIL_USER);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"LPU Quora" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify your email",
      html: `<a href="${link}">Verify</a>`
    });

    console.log("✅ EMAIL SENT:", info.messageId);
  } catch (err) {
    console.error("❌ NODEMAILER ERROR:", err);
    throw err;
  }
};

module.exports = sendEmail;

