const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'metronshoe@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

const emailTemplates = {
  orderConfirmation: (order, user) => ({
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626, #2563eb); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0;">METRONSHOE</h1>
        </div>
        <div style="padding: 2rem; background: #f8f9fa;">
          <h2 style="color: #dc2626;">Thank you ${user.name}!</h2>
          <p>Order ID: ${order._id}</p>
          <p>Total: ₹${order.totalAmount}</p>
          <p>Tracking: ${order.trackingId}</p>
        </div>
      </div>
    `
  }),

  orderStatusUpdate: (order, user, newStatus) => ({
    subject: `Order Update - ${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626, #2563eb); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0;">METRONSHOE</h1>
        </div>
        <div style="padding: 2rem; background: #f8f9fa;">
          <h2>Hi ${user.name},</h2>
          <p>Order #${order._id} is now <strong>${newStatus.toUpperCase()}</strong></p>
        </div>
      </div>
    `
  }),

  welcomeEmail: (user) => ({
    subject: 'Welcome to METRONSHOE!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626, #2563eb); padding: 2rem; text-align: center;">
          <h1 style="color: white; margin: 0;">METRONSHOE</h1>
        </div>
        <div style="padding: 2rem; background: #f8f9fa;">
          <h2>Welcome ${user.name}!</h2>
          <p>Thank you for joining METRONSHOE!</p>
        </div>
      </div>
    `
  })
};

const sendEmail = async (to, template) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"METRONSHOE" <${process.env.EMAIL_USER || 'metronshoe@gmail.com'}>`,
      to: to,
      subject: template.subject,
      html: template.html
    };
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmation: async (order, user) => {
    const template = emailTemplates.orderConfirmation(order, user);
    return await sendEmail(user.email, template);
  },

  sendOrderStatusUpdate: async (order, user, newStatus) => {
    const template = emailTemplates.orderStatusUpdate(order, user, newStatus);
    return await sendEmail(user.email, template);
  },

  sendWelcomeEmail: async (user) => {
    const template = emailTemplates.welcomeEmail(user);
    return await sendEmail(user.email, template);
  }
};