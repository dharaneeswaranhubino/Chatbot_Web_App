import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState, type RefObject, useCallback } from "react";

interface LoadMoreButtonProps {
  onScrollToBottom: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const LoadMoreButton = ({
  onScrollToBottom,
  scrollRef,
}: LoadMoreButtonProps) => {
  const [showScrollDown, setShowScrollDown] = useState(false);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollDown(scrollHeight - scrollTop - clientHeight > 100);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef, handleScroll]);

  if (!showScrollDown) return null;

  return (
    <div className="fixed bottom-28 right-8 flex flex-col gap-3 z-10">
      <button
        onClick={onScrollToBottom}
        className="w-12 h-12 bg-violet-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white hover:bg-violet-700 group"
        title="Go to latest message"
      >
        <FaArrowDown
          className="group-hover:translate-y-0.5 transition-transform"
          size={18}
        />
      </button>
    </div>
  );
};

export default LoadMoreButton;
