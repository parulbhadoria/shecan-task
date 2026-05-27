const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const transporter = nodemailer.createTransport({

  host:"smtp.gmail.com",

  port:587,

  secure:false,

  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});
transporter.verify(function(error, success){

  if(error){
    console.log(error.message);
  }
  else{
    console.log("Email server is ready");
  }
});

app.post("/api/contact", async (req, res) => {

  const { name, email, message } = req.body;

  try {

    if(!name || !email || !message){

  return res.status(400).json({
    success:false,
    message:"All fields are required"
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email)){

  return res.status(400).json({
    success:false,
    message:"Invalid email format"
  });
}

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: "New Contact Form Submission",

      html: `
        <h2>New Submission</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>${message}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});