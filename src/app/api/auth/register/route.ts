import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, encrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, username, name } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
      },
    });

    // Create session
    const token = await encrypt({
      userId: user.id,
    });

    // Set cookie
    const response = NextResponse.json(
      { user: { id: user.id, email: user.email, username: user.username, name: user.name } },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 