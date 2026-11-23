import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(email.trim().toLowerCase(), password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await setAdminSessionCookie(email.trim().toLowerCase());

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
