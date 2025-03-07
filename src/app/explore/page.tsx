'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Post from '@/components/Post';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Post {
  id: string;
  content: string;
  image: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  };
  likes: { userId: string }[];
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string | null;
      username: string;
      image: string | null;
    };
    likes: { userId: string }[];
    replies: {
      id: string;
      content: string;
      createdAt: string;
      user: {
        id: string;
        name: string | null;
        username: string;
        image: string | null;
      };
    }[];
  }[];
}

export default function Explore() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trending' | 'latest'>('trending');

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  async function fetchPosts() {
    try {
      const response = await fetch(`/api/posts?sort=${activeTab}`);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-32 bg-gray-800 rounded mb-4"></div>
            <div className="h-32 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <div className="bg-gray-900/50 border border-purple-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {['Technology', 'Art', 'Music', 'Gaming', 'Sports', 'News'].map((category) => (
                  <div key={category} className="text-gray-300 hover:text-white cursor-pointer hover:bg-purple-900/30 p-2 rounded-md">
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-white mb-6">Explore</h1>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'trending'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab('latest')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'latest'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Latest
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['#Technology', '#Programming', '#Design', '#Development'].map((topic) => (
                  <div
                    key={topic}
                    className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <h3 className="text-white font-medium">{topic}</h3>
                    <p className="text-gray-400 text-sm mt-1">1.2k posts</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block">
            <div className="bg-gray-900/50 border border-purple-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Popular Hashtags</h2>
              <div className="space-y-2">
                {['#Technology', '#Programming', '#Design', '#Development', '#Coding'].map((tag) => (
                  <div key={tag} className="text-purple-400 hover:text-purple-300 cursor-pointer">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 