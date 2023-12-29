const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config/.env" });

async function mailer() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PWD,
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient@example.com",
    subject: "Hello from Nodemailer",
    text: message,
  };

  let message = {
    attachments: [
      {
        raw:
          "Content-Type: text/plain\r\n" +
          "Content-Disposition: attachment;r\n" +
          "r\n" +
          "H" +
          "This is a test email sent from Nodemailer.",
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
}
mailer();
