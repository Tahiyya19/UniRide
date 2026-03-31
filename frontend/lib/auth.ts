import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import type { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'uniride-secure-secret-key-2026';

type SessionPayload = JwtPayload & {
  id: string;
  role: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(payload: SessionPayload) {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  const cookieStore = await cookies();
  cookieStore.set('uniride_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('uniride_session')?.value;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return typeof decoded === 'string' ? null : (decoded as SessionPayload);
  } catch {
    return null;
  }
}

export async function getUserId() {
    const session = await getSession();
    return session?.id ?? null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('uniride_session');
}
