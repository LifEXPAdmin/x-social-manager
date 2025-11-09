import { NextResponse } from 'next/server';

// TODO: integrate with email provider / CRM.
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Subscribe endpoint not yet implemented.' },
    { status: 501 }
  );
}

