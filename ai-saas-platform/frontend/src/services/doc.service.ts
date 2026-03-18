import Puppeteer from 'puppeteer';
import fs from 'fs/promises';

export async function generatePDF(html: string, filename: string) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: filename, format: 'A4' });
  await browser.close();
  return filename;
}

export async function generateDOCX(text: string, filename: string) {
  // Use docx lib or similar
  // Impl for DOCX export
}

