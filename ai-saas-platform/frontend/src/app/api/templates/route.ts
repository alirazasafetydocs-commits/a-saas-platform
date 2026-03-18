import { NextRequest, NextResponse } from 'next/server';

const templates = [
  { id: 'hse-resume', name: 'HSE Resume' },
  // from samples.json
];

export async function GET() {
  return NextResponse.json(templates);
}

