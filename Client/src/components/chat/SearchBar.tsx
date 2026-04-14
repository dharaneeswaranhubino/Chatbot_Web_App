import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearching: boolean;
}

const SearchBar = ({ onSearch, onClear, isSearching }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 2) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search in conversation... (min 2 characters)"
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            autoFocus
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>
        <button
          onClick={handleSearch}
          disabled={query.trim().length < 2 || isSearching}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          <FaTimes />
        </button>
      </div>

      {query.trim().length > 0 && query.trim().length < 2 && (
        <p className="text-xs text-amber-600 mt-2">
          Please enter at least 2 characters to search
        </p>
      )}
    </div>
  );
};

export default SearchBar;
