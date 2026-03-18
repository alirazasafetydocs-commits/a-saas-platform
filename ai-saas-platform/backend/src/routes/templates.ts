import { authMiddleware } from './auth';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

const templatesPath = path.join(__dirname, '../../templates');

export const templateRouter = (app: any) => {
  app.get('/templates', (req: any, res: any) => {
    try {
      const samplesPath = path.join(templatesPath, 'samples.json');
      if (fs.existsSync(samplesPath)) {
        const data = JSON.parse(fs.readFileSync(samplesPath, 'utf8'));
        res.json(data);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Templates load failed' });
    }
  });

  app.get('/templates/:id', authMiddleware, (req: any, res: any) => {
    const { id } = req.params;
    try {
      const samplesPath = path.join(templatesPath, 'samples.json');
      const data = JSON.parse(fs.readFileSync(samplesPath, 'utf8'));
      const template = data.find((t: any) => t.id === id);
      if (template) {
        res.json(template);
      } else {
        res.status(404).json({ error: 'Template not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Template load failed' });
    }
  });
};

