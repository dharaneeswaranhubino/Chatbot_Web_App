import { useNavigate } from "react-router-dom";
import type { RecentChat } from "../../features/userDashboard/userDashboardTypes";

interface UserDashboardRecentChatsProps {
  chats: RecentChat[];
}

const UserDashboardRecentChats = ({ chats }: UserDashboardRecentChatsProps) => {
    const navigate = useNavigate();
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return "Just now";
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (chats.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-sm p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <i className="fa-regular fa-comment-dots text-white text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Chats</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
            <i className="fa-regular fa-message text-3xl text-violet-400" />
          </div>
          <p className="text-gray-500 font-medium">No chats yet</p>
          <p className="text-sm text-gray-400 mt-1">Start a conversation!</p>
        </div>
      </div>
    );
  }

  const chatRedirect = () =>{
    navigate("/chatbot")
  }

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-sm p-6 border border-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
          <i className="fa-regular fa-comments text-white text-lg" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Recent Chats</h3>
        <span className="ml-auto text-xs text-violet-500 bg-violet-50 px-2 py-1 rounded-full">
          {chats.length} messages
        </span>
      </div>
      
      <div className="space-y-3">
        {chats.map((chat, index) => (
          <div 
            key={chat.id} 
            className="group hover:shadow-md transition-all duration-300 rounded-xl bg-white hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 border border-gray-100 hover:border-violet-200"
          >
            <div className="flex items-start gap-3 p-3">
              <div className="flex-shrink-0">
                {chat.sender === "user" ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-user text-white text-sm" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-robot text-white text-sm" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {chat.sender === "user" ? (
                        <span className="text-blue-600">You</span>
                      ) : (
                        <span className="text-violet-600">ConvoCore Bot</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="fa-regular fa-clock mr-1" />
                      {formatTime(chat.createdAt)}
                    </span>
                  </div>
                  {chat.sender === "bot" && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fa-regular fa-face-smile text-gray-400 text-sm" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 break-words group-hover:text-gray-700">
                  {chat.message}
                </p>
              </div>
            </div>
            {index < chats.length - 1 && (
              <div className="border-b border-gray-100 ml-14"></div>
            )}
          </div>
        ))}
      </div>
      
      {chats.length >= 5 && (
        <div className="mt-4 pt-3 text-center">
          <button onClick={chatRedirect} className="text-sm text-violet-500 hover:text-violet-700 font-medium transition-colors">
            View all conversations <i className="fa-solid fa-arrow-right ml-1 text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboardRecentChats;