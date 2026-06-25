import nodemailer from 'nodemailer';
import config from '../config';
import logger from '../logger/winston.logger';

/**
 * EMAIL DISPATCH SERVICE
 * 
 * Configures the Nodemailer transport wrapper.
 */
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST || 'smtp.mailtrap.io',
  port: config.SMTP_PORT || 2525,
  auth: {
    user: config.SMTP_USER || '',
    pass: config.SMTP_PASS || '',
  },
});

export const mailService = {
  sendEmail: async (to: string, subject: string, html: string): Promise<void> => {
    try {
      await transporter.sendMail({
        from: config.SMTP_FROM,
        to,
        subject,
        html,
      });
      logger.info(`📧 Email successfully dispatched to ${to}`);
    } catch (err) {
      logger.error(`❌ Failed to send email to ${to}:`, err);
      // Operational failure: we shouldn't throw error to crash routes, but log it
    }
  },
};

export default mailService;
