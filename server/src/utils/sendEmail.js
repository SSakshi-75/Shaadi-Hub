import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // If it's a placeholder, use Ethereal Mail for a real-looking preview
  if (process.env.EMAIL_PASS === 'your_app_password') {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"ShaadiHub Test" <test@shaadihub.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #e91e63;">ShaadiHub Password Reset</h2>
          <p>You requested a password reset. Please click the button below to set a new password:</p>
          <a href="${options.message.split(' ').pop()}" style="display: inline-block; padding: 12px 24px; background-color: #e91e63; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">Link: ${options.message.split(' ').pop()}</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('-------------------------------------------');
    console.log('📧 TEST EMAIL SENT (Ethereal Mail)');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    console.log('-------------------------------------------');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `ShaadiHub <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #e91e63;">ShaadiHub Password Reset</h2>
        <p>You requested a password reset. Please click the button below to set a new password:</p>
        <a href="${options.message.split(' ').pop()}" style="display: inline-block; padding: 12px 24px; background-color: #e91e63; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
