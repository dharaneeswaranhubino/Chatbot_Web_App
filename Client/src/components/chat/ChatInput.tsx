import { useState, type KeyboardEvent, useRef, useEffect } from "react";
import { FaPaperPlane, FaStop } from "react-icons/fa";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

const ChatInput = ({ onSend, isLoading, onStop }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LENGTH = 2000;
  const MAX_HEIGHT = 200;
  const MAX_CHARS_PER_LINE = 64;

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSend(message.trim());
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  //handle text input with line length limiting
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value.slice(0, MAX_LENGTH);

    // it prevents horizontal scrolling by inserting line breaks
    const lines = newText.split("\n");
    const wrappedLines: string[] = [];

    // break long lines into multiple lines
    for (const line of lines) {
      if (line.length > MAX_CHARS_PER_LINE) {
        for (let i = 0; i < line.length; i += MAX_CHARS_PER_LINE) {
          wrappedLines.push(line.slice(i, i + MAX_CHARS_PER_LINE));
        }
      } else {
        wrappedLines.push(line);
      }
    }

    newText = wrappedLines.join("\n");
    setMessage(newText);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight > MAX_HEIGHT) {
      textarea.style.height = `${MAX_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="border-t border-gray-200 bg-white mb-1 md:mx-10 lg:mx-40 rounded-xl">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-xl border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="w-full px-4 py-3 pr-24 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none overflow-x-hidden break-words whitespace-pre-wrap"
            disabled={isLoading}
            style={{
              lineHeight: "1.5",
              overflowY: "hidden",
              overflowX: "hidden",
              maxHeight: `${MAX_HEIGHT}px`,
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-2 bg-white bg-opacity-90 rounded-lg px-1">
            {message.length > 0 && (
              <span
                className={`text-xs px-1 ${
                  message.length >= MAX_LENGTH
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {message.length}/{MAX_LENGTH}
              </span>
            )}

            {isLoading ? (
              <button
                onClick={onStop}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600"
                title="Stop generating"
              >
                <FaStop size={14} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="p-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 transition disabled:opacity-40 disabled:cursor-not-allowed text-white"
                title="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
