'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface User {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  likes: { userId: string }[];
  replies: {
    id: string;
    content: string;
    createdAt: string;
    user: User;
  }[];
}

interface PostProps {
  id: string;
  content: string;
  image?: string | null;
  createdAt: string;
  author: User;
  likes: { userId: string }[];
  comments: Comment[];
}

const Post = ({ id, content, image, createdAt, author, likes, comments: initialComments }: PostProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        // Update likes count
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleReply = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`/api/posts/${id}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent }),
      });

      if (response.ok) {
        const reply = await response.json();
        setComments(comments.map(comment => 
          comment.id === commentId 
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        ));
        setReplyContent('');
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/posts/${id}/comments/${commentId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        // Update comment likes count
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name || author.username}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold">
              {author.name?.[0] || author.username[0]}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-white font-semibold">{author.name || author.username}</h3>
          <p className="text-gray-400 text-sm">@{author.username}</p>
        </div>
      </div>

      <p className="text-white mb-4">{content}</p>

      {image && (
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className="flex items-center text-gray-400 hover:text-purple-400"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{likes.length}</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-purple-400">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                {comment.user.image ? (
                  <Image
                    src={comment.user.image}
                    alt={comment.user.name || comment.user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {comment.user.name?.[0] || comment.user.username[0]}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {comment.user.name || comment.user.username}
                </p>
                <p className="text-gray-400 text-xs">@{comment.user.username}</p>
              </div>
            </div>
            <p className="text-white text-sm mb-2">{comment.content}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <button
                onClick={() => handleCommentLike(comment.id)}
                className="flex items-center hover:text-purple-400"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{comment.likes.length}</span>
              </button>
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="hover:text-purple-400"
              >
                Reply
              </button>
            </div>

            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleReply(e, comment.id)} className="mt-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </form>
            )}

            {comment.replies.length > 0 && (
              <div className="mt-2 ml-6 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-600 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                        {reply.user.image ? (
                          <Image
                            src={reply.user.image}
                            alt={reply.user.name || reply.user.username}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {reply.user.name?.[0] || reply.user.username[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">
                          {reply.user.name || reply.user.username}
                        </p>
                        <p className="text-gray-400 text-xs">@{reply.user.username}</p>
                      </div>
                    </div>
                    <p className="text-white text-xs">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {user && (
          <form onSubmit={handleComment} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Post; 