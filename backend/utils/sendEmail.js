const nodemailer = require('nodemailer');

const sendOrderEmail = async (order, user) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Build items HTML
    const itemsHTML = order.items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">${item.name}</td>
        <td style="padding: 10px; text-align: center;">${item.size}</td>
        <td style="padding: 10px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 10px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    // Create email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .order-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background-color: #f2f2f2; padding: 10px; text-align: left; }
          .total { font-size: 1.2em; font-weight: bold; text-align: right; padding: 15px 0; border-top: 2px solid #333; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          
          <div class="content">
            <h2>Thank you for your order, ${user.name}!</h2>
            <p>We're processing your order and will send you shipping updates soon.</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> #${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            </div>

            <h3>Order Items:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Size</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total">
              Total Amount: ₹${order.totalPrice.toFixed(2)}
            </div>

            ${order.shippingAddress ? `
              <div class="order-details">
                <h3>Shipping Address:</h3>
                <p>
                  ${order.shippingAddress.fullName}<br>
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                  ${order.shippingAddress.country}<br>
                  Phone: ${order.shippingAddress.phone}
                </p>
              </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>If you have any questions, please contact our customer support.</p>
            <p>&copy; ${new Date().getFullYear()} Your Clothing Store. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"Your Clothing Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation - #${order._id}`,
      html: emailHTML
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendOrderEmail;