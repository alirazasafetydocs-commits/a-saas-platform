import { NextRequest, NextResponse } from 'next/server';
import { generateResume } from '../../../services/ai.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume = await generateResume(body.userData, body.templateId);
    return NextResponse.json({ resume });
  } catch (error) {
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
  }
}

