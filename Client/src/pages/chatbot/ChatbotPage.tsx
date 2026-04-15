import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getMessages,
  sendMessage,
  searchMessages,
  clearSearch,
  streamBotMessage,
} from "../../features/chatbot/chatbotSlice";
import { FiSearch } from "react-icons/fi";
import { GiRobotGolem } from "react-icons/gi";
import { BsChatDots } from "react-icons/bs";
import SearchBar from "../../components/chat/SearchBar";
import MessageBubble from "../../components/chat/MessageBubble";
import TypingIndicator from "../../components/chat/TypingIndicator";
import ChatInput from "../../components/chat/ChatInput";
import LoadMoreButton from "../../components/chat/LoadMoreButton";
import HistorySidebar from "../../components/chat/HistorySidebar";
import type { ChatMessage } from "../../features/chatbot/chatTypes";

const ChatbotPage = () => {
  const dispatch = useAppDispatch();
  const { messages, loading, sending, searchResults, isSearching } =
    useAppSelector((state) => state.chat);
  const [isTyping, setIsTyping] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    dispatch(getMessages({ limit: 50, offset: 0 })).then(() => {
      setInitialLoadDone(true);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });
  }, [dispatch]);

  const handleSendMessage = async (message: string) => {
    setIsTyping(true);
    const result = await dispatch(sendMessage(message));
    setIsTyping(false);

    if (sendMessage.fulfilled.match(result)) {
      const botMsg = result.payload.botMessage;
      const chars = botMsg.message.split("");

      for (let i = 0; i < chars.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        dispatch(streamBotMessage({ id: botMsg.id, char: chars[i] }));

        if (scrollRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
          if (isNearBottom) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }
      }

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleSearch = (query: string) => {
    setCurrentSearchTerm(query); // Store the search term
    dispatch(searchMessages(query));
    setShowSearch(true);
  };

  const handleClearSearch = () => {
    setCurrentSearchTerm(""); // Clear the search term
    dispatch(clearSearch());
    setShowSearch(false);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleMessageClick = (message: ChatMessage) => {
    // find the message in the DOM and scroll to it
    const messageElement = document.getElementById(`message-${message.id}`);
    if (messageElement && scrollRef.current) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsHistoryOpen(false); // Close sidebar after clicking
    }
  };

  const displayMessages = showSearch ? searchResults : messages;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-50 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white flex gap-3 items-center">
              <GiRobotGolem size={30} /> ChatBot Assistant
            </h1>
            <p className="text-violet-100 text-sm">
              Ask me anything! I'm here to help.
            </p>
          </div>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
          >
            <FiSearch size={22} />
          </button>
        </div>
      </div>

      {showSearch && (
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isSearching}
        />
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
      >
        {loading && displayMessages.length === 0 && !initialLoadDone ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        ) : displayMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <BsChatDots size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500">No messages yet</p>
            <p className="text-sm text-gray-400">
              Start a conversation by typing a message below!
            </p>
          </div>
        ) : (
          displayMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              searchTerm={showSearch ? currentSearchTerm : ""}
            />
          ))
        )}

        {isTyping && <TypingIndicator />}
      </div>
      <ChatInput onSend={handleSendMessage} isLoading={sending} />

      {!showSearch && (
        <LoadMoreButton
          onScrollToBottom={scrollToBottom}
          scrollRef={scrollRef}
        />
      )}

      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
        onMessageClick={handleMessageClick}
      />
    </div>
  );
};

export default ChatbotPage;
