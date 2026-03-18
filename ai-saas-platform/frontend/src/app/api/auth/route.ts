import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Simple mock auth
    const token = 'mock-jwt-token-' + body.email;
    return NextResponse.json({ token, user: { id: 1, email: body.email } });
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 401 });
  }
}


