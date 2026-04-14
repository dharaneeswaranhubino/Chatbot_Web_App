const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-8">
      <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-3">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
