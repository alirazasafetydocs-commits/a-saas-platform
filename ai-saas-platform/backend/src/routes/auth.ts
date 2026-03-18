import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { sendWelcomeEmail } from '../services/email.service';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// In-memory users (replace with DB later)
const users: any[] = [];
export { users };

export const authRouter = (app: any) => {
  app.post('/auth/signup', async (req: any, res: any) => {
    try {
      const { email, password, name } = signupSchema.parse(req.body);
      const hashedPw = await bcrypt.hash(password, 12);
      const user = { id: Date.now().toString(), email, name, password: hashedPw };
      users.push(user);
      // Send welcome email
      sendWelcomeEmail(email, name).catch(console.error);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, email, name } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Signup failed' });
    }
  });

  app.post('/auth/login', async (req: any, res: any) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = users.find((u: any) => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Login failed' });
    }
  });

  app.get('/auth/me', authMiddleware, async (req: any, res: any) => {
    const token = req.headers.authorization!.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = users.find((u: any) => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  });

};

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


