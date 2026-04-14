import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface HistoryToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HistoryToggleButton = ({ isOpen, onClick }: HistoryToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-26 right-[-16px] z-40 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group border border-gray-200"
      title={isOpen ? "Close history" : "Open history"}
    >
      {isOpen ? (
        <FaChevronRight
          className="text-violet-600 group-hover:text-violet-700 mr-96"
          size={20}
        />
      ) : (
        <FaChevronLeft
          className="text-violet-600 group-hover:text-violet-700"
          size={20}
        />
      )}
    </button>
  );
};

export default HistoryToggleButton;
