import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';
import * as path from 'path';

interface ExportOptions {
  content: string;
  format: 'pdf' | 'docx' | 'txt' | 'xlsx';
  filename?: string;
}

export const generateDocument = async (options: ExportOptions): Promise<{ fileBuffer: Uint8Array; filename: string }> => {
  const { content, format, filename = 'document' } = options;
  let fileBuffer: Uint8Array;

  switch (format) {
    case 'pdf':
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page = pdfDoc.addPage([600, 800]);
      const text = content.split('\\n').join('\\n');
      page.drawText(text, {
        x: 50,
        y: 750,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      fileBuffer = await pdfDoc.save();
      return { fileBuffer, filename: `${filename}.pdf` };

    case 'docx':
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(content.replace(/\\\\n/g, '\\n'))],
            }),
          ],
        }],
      });
      fileBuffer = await Packer.toBuffer(doc);
      return { fileBuffer, filename: `${filename}.docx` };

    case 'txt':
      fileBuffer = Buffer.from(content, 'utf8');
      return { fileBuffer, filename: `${filename}.txt` };

    case 'xlsx':
      // Simple text export as xlsx (basic, requires exceljs for full)
      fileBuffer = Buffer.from(content, 'utf8');
      return { fileBuffer, filename: `${filename}.xlsx` };

    default:
      throw new Error('Unsupported format');
  }
};

