import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3002;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
import { authRouter } from './routes/auth';
import { aiRouter } from './routes/ai';
import { paymentRouter } from './routes/payments';
import { emailRouter } from './routes/email';
import { templateRouter } from './routes/templates';
import { adminRouter } from './routes/admin';
import { authMiddleware } from './routes/auth';
import { generateDocument } from './services/doc.service';

paymentRouter(app);
emailRouter(app);
templateRouter(app);
adminRouter(app);

// New download route
app.post('/download', authMiddleware, async (req: any, res: any) => {
  try {
    const { content, format, filename } = req.body;
    const result = await generateDocument({ content, format, filename });
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${result.filename}"`,
    });
    res.send(result.fileBuffer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

authRouter(app);
aiRouter(app);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI SaaS Backend Running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});

