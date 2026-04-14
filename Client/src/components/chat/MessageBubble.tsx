import type { ChatMessage } from "../../features/chatbot/chatTypes";

interface MessageBubbleProps {
  message: ChatMessage;
  searchTerm?: string;
}

const MessageBubble = ({ message, searchTerm = "" }: MessageBubbleProps) => {
  const isUser = message.sender === "user";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const highlightText = (text: string, search: string) => {
    if (!search || search.trim().length === 0) return text;
    
    try {
      // escape special regex characters
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedSearch})`, "gi");
      const parts = text.split(regex);
      
      return parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 text-gray-800 px-0.5 rounded font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch (error) {
      console.error("Highlight error:", error);
      return text;
    }
  };

  return (
    <div id={`message-${message.id}`} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}>
      <div
        className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}
      >
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {searchTerm && searchTerm.length >= 2
              ? highlightText(message.message, searchTerm)
              : message.message}
          </p>
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;