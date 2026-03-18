import { authMiddleware } from './auth';
import jwt from 'jsonwebtoken';

import { z } from 'zod';

// In-memory users from auth
declare global {
  var users: any[];
}

export const adminRouter = (app: any) => {
  app.get('/admin/users', authMiddleware, (req: any, res: any) => {
    // Simple admin check (email ends with @admin)
    const token = req.headers.authorization!.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = global.users.find((u: any) => u.id === decoded.userId);
    if (!user || !user.email.endsWith('@admin.com')) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    res.json(global.users.map((u: any) => ({ id: u.id, email: u.email, name: u.name })));
  });
};

