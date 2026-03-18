import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or other SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD || 'your_app_password',
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Email error:', error);
    return { error: error.message };
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <h1>Welcome to AI SaaS, ${name}!</h1>
    <p>Your account is ready. Generate resumes, documents and more.</p>
    <p>WhatsApp support: ${process.env.WHATSAPP_NUMBER}</p>
  `;
  return sendEmail(email, 'Welcome to AI SaaS Platform', html);
};

