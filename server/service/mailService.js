const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationCode(to, code) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Code for social media",
      text: "zxc",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Подтверждение регистрации</h2>
          <p>Ваш код подтверждения:</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
            ${code}
          </div>
          <p>Код действителен в течение 15 минут.</p>
          <p>Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.</p>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
