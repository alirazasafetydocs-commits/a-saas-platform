import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Stripe payment logic
  return NextResponse.json({ success: true, paymentId: 'mock' });
}

