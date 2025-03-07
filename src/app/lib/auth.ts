import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const secretKey = process.env.JWT_SECRET || 'your-super-secret-jwt-key-32-chars-long';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  console.log('Token from cookie:', token ? 'exists' : 'not found');
  
  if (!token) return null;
  try {
    const payload = await decrypt(token);
    console.log('Decoded token payload:', payload);
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function getUser() {
  console.log('Getting user...');
  const session = await getSession();
  console.log('Session:', session);
  
  if (!session?.userId) {
    console.log('No userId in session');
    return null;
  }
  
  console.log('Looking up user with ID:', session.userId);
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      bio: true,
      image: true,
    },
  });
  
  console.log('Found user:', user);
  return user;
} 