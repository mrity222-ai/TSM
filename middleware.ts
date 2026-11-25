import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'stocktimes_admin_session';
const SESSION_SECRET = process.env.ADMIN_SECRET || 'thestocktimes_local_secret_key_2026_finance';

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifyEdgeSessionToken(token: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [encodedData, signature] = parts;
    if (!encodedData || !signature) return false;

    const data = decodeBase64Url(encodedData);
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    const expectedSig = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (!timingSafeEqualHex(signature, expectedSig)) return false;

    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed.email !== 'string' || typeof parsed.exp !== 'number') {
      return false;
    }

    return parsed.exp >= Date.now();
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

    if (!sessionToken || !(await verifyEdgeSessionToken(sessionToken))) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      if (sessionToken) {
        response.cookies.delete(SESSION_COOKIE);
      }
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
