import { useAppSelector } from "../../hooks/reduxHooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { ChatMessage } from "../../features/chatbot/chatTypes";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onMessageClick?: (message: ChatMessage) => void;
}

const HistorySidebar = ({
  isOpen,
  onToggle,
  onMessageClick,
}: HistorySidebarProps) => {
  const { messages, loading, total } = useAppSelector((state) => state.chat);

  const groupMessagesByDate = (msgs: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};

    msgs.forEach((msg) => {
      const date = new Date(msg.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[formattedDate]) groups[formattedDate] = [];
      groups[formattedDate].push(msg);
    });

    return Object.entries(groups)
      .map(([date, messages]) => ({ date, messages }))
      .sort((a, b) => {
        const dateA = new Date(a.messages[0]!.createdAt);
        const dateB = new Date(b.messages[0]!.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
  };

  const groupedMessages =
    messages.length > 0 ? groupMessagesByDate(messages) : [];

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSenderClass = (sender: string) =>
    sender === "user"
      ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
      : "bg-gray-100 text-gray-800";

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full z-50 flex items-start transition-transform duration-300 ease-in-outshadow ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onToggle}
          className="absolute -left-10 top-24 bg-white border border-gray-200 rounded-l-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-violet-50 transition"
          title={isOpen ? "Close history" : "Open history"}
        >
          {isOpen ? (
            <FaChevronRight className="text-violet-600" size={16} />
          ) : (
            <FaChevronLeft className="text-violet-600" size={16} />
          )}
        </button>

        <div className="w-96 h-full bg-white shadow-2xl flex flex-col">
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-4">
            <h2 className="text-white font-bold text-lg">
              <i className="fa-solid fa-scroll"></i> Chat History
            </h2>
            <p className="text-violet-100 text-sm">{total} total messages</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {loading && groupedMessages.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <i className="fas fa-spinner fa-spin text-violet-600 text-2xl"></i>
              </div>
            ) : groupedMessages.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                <p>No chat history yet</p>
                <p className="text-sm mt-2">
                  Start a conversation to see history here!
                </p>
              </div>
            ) : (
              groupedMessages.map((group, idx) => (
                <div key={idx} className="mb-6">
                  <div className="sticky top-0 bg-white z-10 py-2 text-center">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {group.date}
                    </span>
                  </div>

                  <div className="space-y-3 mt-3">
                    {group.messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => onMessageClick?.(msg)}
                        className={`cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md rounded-lg p-3 ${getSenderClass(msg.sender)}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg">
                            {msg.sender === "user" ? (
                              <i className="fa-solid fa-user"></i>
                            ) : (
                              <i className="fa-solid fa-robot"></i>
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {msg.sender === "user" ? "You" : "Bot Assistant"}
                            </p>
                            <p className="text-xs opacity-80 line-clamp-2 mt-1">
                              {msg.message}
                            </p>
                            <p className="text-xs opacity-60 mt-1">
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;
