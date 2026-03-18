import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Admin data
  return NextResponse.json({ users: [], stats: {} });
}

