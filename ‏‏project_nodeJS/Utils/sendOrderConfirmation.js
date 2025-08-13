import nodemailer from 'nodemailer';

const sendOrderConfirmation = async (email, fullName, orderDetails) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourshop@gmail.com',       // החליפי במייל שלך
        pass: 'your_app_password'         // סיסמת אפליקציה מגוגל (לא הסיסמה הרגילה!)
      }
    });

    const itemsListHtml = orderDetails.items.map(
      (item, i) => `<li>מוצר #${i + 1} — מזהה: ${item.productId}, כמות: ${item.quantity}</li>`
    ).join('');

    const mailOptions = {
      from: '"SealSpark" <yourshop@gmail.com>',
      to: email,
      subject: 'אישור הזמנה מ-SealSpark 🎁',
      html: `
        <h2>שלום ${fullName},</h2>
        <p>תודה על ההזמנה שלך!</p>
        <p><strong>פרטי ההזמנה:</strong></p>
        <ul>${itemsListHtml}</ul>
        <p><strong>סה"כ מוצרים:</strong> ${orderDetails.totalItems}</p>
        <p>נשמח לראותך שוב בקרוב!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ אימייל נשלח ל: ${email}`);
  } catch (err) {
    console.error('❌ שגיאה בשליחת אימייל:', err.message);
  }
};

export default sendOrderConfirmation;
