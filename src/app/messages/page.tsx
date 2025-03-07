import Navbar from '@/components/Navbar';

export default function Messages() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Chat List */}
          <div className="md:col-span-1 bg-gray-900/50 border border-purple-800 rounded-lg">
            <div className="p-4 border-b border-purple-800">
              <h2 className="text-xl font-semibold text-white">Messages</h2>
            </div>
            <div className="divide-y divide-purple-800">
              {[1, 2, 3, 4, 5].map((chat) => (
                <div key={chat} className="p-4 hover:bg-purple-900/30 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-700 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">User Name</h3>
                      <p className="text-gray-400 text-sm truncate">Last message preview...</p>
                    </div>
                    <div className="text-xs text-gray-500">2m ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="md:col-span-2 bg-gray-900/50 border border-purple-800 rounded-lg flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-purple-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-700 rounded-full"></div>
                <div>
                  <h3 className="text-white font-medium">User Name</h3>
                  <p className="text-gray-400 text-sm">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {[1, 2, 3].map((message) => (
                <div key={message} className={`flex ${message % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message % 2 === 0 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    <p>This is a sample message. Lorem ipsum dolor sit amet.</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message % 2 === 0 ? '2:30 PM' : '2:29 PM'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-800">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border-purple-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 