import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId: user.id,
        commentId: params.commentId,
      },
    });

    if (existingLike) {
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.commentLike.create({
        data: {
          userId: user.id,
          commentId: params.commentId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 