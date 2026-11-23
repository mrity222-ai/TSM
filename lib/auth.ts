import crypto from 'crypto';
import { db, hashPassword } from './db';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'stocktimes_admin_session';
const SESSION_SECRET = process.env.ADMIN_SECRET || 'thestocktimes_local_secret_key_2026_finance';

export function verifyAdminCredentials(email: string, password: string):boolean {
  const row = db.prepare('SELECT * FROM admins WHERE email = ?').get(email) as any;
  if (!row) return false;
  return row.password_hash === hashPassword(password);
}

export function createSessionToken(email: string): string {
  const data = JSON.stringify({ email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }); // 7 days
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  return Buffer.from(data).toString('base64url') + '.' + hmac;
}

export function verifySessionToken(token: string): { email: string } | null {
  try {
    const [encodedData, signature] = token.split('.');
    if (!encodedData || !signature) return null;

    const data = Buffer.from(encodedData, 'base64url').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');

    if (signature !== expectedSig) return null;

    const parsed = JSON.parse(data);
    if (parsed.exp < Date.now()) return null;

    return { email: parsed.email };
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie(email: string) {
  const cookieStore = await cookies();
  const token = createSessionToken(email);
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionToken) return null;
  return verifySessionToken(sessionToken);
}

export { SESSION_COOKIE };
