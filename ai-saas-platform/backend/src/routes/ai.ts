import { generateResume, generateCoverLetter, generateHSEDocs, generateWebsite } from '../services/ai.service';
import { z } from 'zod';

export const aiRouter = (app: any) => {
  app.post('/ai/resume', async (req: any, res: any) => {
    try {
      const result = await generateResume(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/ai/cover-letter', async (req: any, res: any) => {
    try {
      const result = await generateCoverLetter(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/ai/hse-docs', async (req: any, res: any) => {
    try {
      const result = await generateHSEDocs(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/ai/website', async (req: any, res: any) => {
    try {
      const result = await generateWebsite(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};

