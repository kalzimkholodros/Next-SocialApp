'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Post from '@/components/Post';
import Image from 'next/image';
import Navbar from '@/components/Navbar';


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

interface Post {
  id: string;
  content: string;
  image: string | null;
  createdAt: string;
  author: User;
  likes: { userId: string }[];
  comments: Comment[];
}

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPost.trim() && !image) {
      setError('Please add some content or an image to your post');
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        // Create FormData for image upload
        const formData = new FormData();
        formData.append('file', image);
        
        // Upload image to your storage service (e.g., Cloudinary, AWS S3)
        // For now, we'll use a placeholder URL
        imageUrl = imagePreview;
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPost.trim(),
          image: imageUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPosts([data, ...posts]);
        setNewPost('');
        setImage(null);
        setImagePreview(null);
      } else {
        throw new Error(data.error || 'Failed to create post');
      }
    } catch (error: any) {
      console.error('Error creating post:', error);
      setError(error.message || 'Failed to create post');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-32 bg-gray-800 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        {user && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-purple-500">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    {user.name?.[0] || user.username[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">{user.name || user.username}</h3>
                <p className="text-gray-400 text-sm">@{user.username}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-gray-700/50 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none border border-gray-600"
                rows={3}
              />
              {imagePreview && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-600">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!newPost.trim() && !image}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-lg p-8">
                <svg className="w-16 h-16 mx-auto text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                <p className="text-gray-400">Be the first to share something!</p>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <Post key={post.id} {...post} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
