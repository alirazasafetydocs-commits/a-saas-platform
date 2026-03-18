import { authMiddleware } from './auth';
import { sendEmail, sendWelcomeEmail } from '../services/email.service';
import { z } from 'zod';

export const emailRouter = (app: any) => {
  app.post('/email/send', authMiddleware, async (req: any, res: any) => {
    const schema = z.object({
      to: z.string().email(),
      subject: z.string(),
      html: z.string(),
    });
    try {
      const { to, subject, html } = schema.parse(req.body);
      const result = await sendEmail(to, subject, html);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/auth/welcome', async (req: any, res: any) => {
    const schema = z.object({
      email: z.string().email(),
      name: z.string(),
    });
    try {
      const { email, name } = schema.parse(req.body);
      const result = await sendWelcomeEmail(email, name);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};

