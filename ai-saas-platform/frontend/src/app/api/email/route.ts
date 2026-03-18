import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../../services/email.service';

export async function POST(req: NextRequest) {
  const body = await req.json();
  await sendEmail(body.to, body.subject, body.html);
  return NextResponse.json({ success: true });
}

