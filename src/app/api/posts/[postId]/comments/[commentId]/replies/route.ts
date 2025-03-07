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

    const { content } = await request.json();

    const reply = await prisma.comment.create({
      data: {
        content,
        userId: user.id,
        postId: params.postId,
        parentId: params.commentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 