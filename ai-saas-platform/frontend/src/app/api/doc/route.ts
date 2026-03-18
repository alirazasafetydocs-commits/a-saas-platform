import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '../../../services/doc.service';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pdfPath = await generatePDF(body.html, 'resume.pdf');
  return NextResponse.json({ pdf: pdfPath });
}

