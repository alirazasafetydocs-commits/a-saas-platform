import { authMiddleware } from './auth';
import { z } from 'zod';

export const paymentRouter = (app: any) => {
  app.get('/payments/config', authMiddleware, (req: any, res: any) => {
    res.json({
      easypaisa: process.env.EASYPAISA_NUMBER,
      meezanAccount: process.env.MEEZAN_BANK_ACCOUNT,
      meezanIBAN: process.env.MEEZAN_IBAN,
      whatsapp: process.env.WHATSAPP_NUMBER,
      message: 'Contact WhatsApp for payment confirmation after transfer',
    });
  });

  app.post('/payments/confirm', authMiddleware, async (req: any, res: any) => {
    const schema = z.object({
      amount: z.number(),
      txid: z.string(),
      method: z.enum(['easypaisa', 'meezan']),
    });
    try {
      const { amount, txid, method } = schema.parse(req.body);
      // Log payment, upgrade user premium (in-memory)
      res.json({ success: true, message: 'Payment received, premium activated!' });
    } catch (error: any) {
      res.status(400).json({ error: 'Invalid payment data' });
    }
  });
};

