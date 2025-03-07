'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', name: 'Posts', count: 42 },
    { id: 'saved', name: 'Saved', count: 12 },
    { id: 'media', name: 'Media', count: 28 },
  ];

  const posts = [
    {
      id: 1,
      title: 'My latest project',
      content: 'Just finished working on an amazing project! Check it out and let me know what you think.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      likes: 234,
      comments: 45,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      content: 'Had a great time at the tech conference! Met so many amazing people and learned a lot.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      likes: 189,
      comments: 32,
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      title: 'New Design System',
      content: 'Excited to share our new design system! It\'s been months in the making and we\'re finally ready to launch.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      likes: 156,
      comments: 28,
      timestamp: '1 day ago',
    },
  ];

  const savedPosts = [
    {
      id: 1,
      title: 'Amazing sunset at the beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      author: 'John Doe',
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      title: 'City lights at night',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      author: 'Jane Smith',
      likes: 189,
      comments: 32,
    },
    {
      id: 3,
      title: 'Mountain adventure',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      author: 'Mike Johnson',
      likes: 156,
      comments: 28,
    },
  ];

  const mediaPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      likes: 189,
      comments: 32,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      likes: 156,
      comments: 28,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      likes: 143,
      comments: 21,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
      likes: 98,
      comments: 15,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
      likes: 76,
      comments: 12,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/50 border border-purple-800 rounded-lg p-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-purple-700 rounded-full mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-white">User Name</h2>
                <p className="text-gray-400">@username</p>
                <p className="text-gray-300 mt-2">Bio description goes here. Lorem ipsum dolor sit amet.</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="text-center">
                    <div className="text-white font-bold">1.2K</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">890</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">234</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mt-4">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-purple-800 rounded-lg p-4 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Programming', 'Design', 'Music', 'Gaming'].map((interest) => (
                  <span key={interest} className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Posts */}
          <div className="md:col-span-2">
            <div className="bg-gray-900/50 border border-purple-800 rounded-lg p-4 mb-6">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {tab.name}
                    <span className="ml-2 text-xs bg-gray-700/50 px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {activeTab === 'posts' && posts.map((post) => (
                <div key={post.id} className="bg-gray-900/50 border border-purple-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-700 rounded-full mr-3"></div>
                    <div>
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <p className="text-gray-400 text-sm">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  {post.image && (
                    <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex space-x-4 text-gray-400">
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </button>
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              ))}

              {activeTab === 'saved' && savedPosts.map((post) => (
                <div key={post.id} className="bg-gray-900/50 border border-purple-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-700 rounded-full mr-3"></div>
                    <div>
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <p className="text-gray-400 text-sm">by {post.author}</p>
                    </div>
                  </div>
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex space-x-4 text-gray-400">
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </button>
                    <button className="hover:text-white flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              ))}

              {activeTab === 'media' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaPosts.map((post) => (
                    <div key={post.id} className="group relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt="Media post"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center space-x-4 text-white">
                            <span>
                              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {post.likes}
                            </span>
                            <span>
                              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage; 