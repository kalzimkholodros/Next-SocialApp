import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        postId: params.postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: params.postId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 