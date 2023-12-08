const userschema = require('../models/usermodel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
exports.sendotp = async (req, res) => {
  try {
    const emailEntered = req.body.Email;
    const randomNum = Math.random() * 9000;
    const OTP = Math.floor(1000 + randomNum);
    const user = await userschema.findOne({ Email: emailEntered });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.OTP = OTP;
    await user.save();
    await sendOTPEmail(emailEntered, OTP);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const sendOTPEmail = async (email, OTP) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'suhiteswar123@gmail.com',
        pass: 'mjoclceglogmywud',
      },
    });
    const mailOptions = {
      from: 'suhiteswar123@gmail.com',
      to: email,
      subject: 'Your OTP for verification',
      text: `Your OTP is: ${OTP}`,
    };
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

exports.verifyotp = async (req, res) => {
    try {
      const emailEntered = req.body.Email;
      const enteredOTP = req.body.OTP;
      const newPassword = req.body.NewPassword;
      const user = await userschema.findOne({ Email: emailEntered });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (enteredOTP !== user.OTP) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.Password = hashedPassword;
      user.OTP = null;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error verifying OTP and updating password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };