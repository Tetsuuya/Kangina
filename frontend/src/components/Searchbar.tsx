import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    // Search functionality will be implemented later
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className={`relative flex items-center rounded-sm border border-black bg-white px-2 py-2 shadow-sm transition-all ${isFocused ? 'ring-2 ring-gray-200' : ''}`}>
        <Search size={20} className="text-gray-400 mr-2" strokeWidth={1.5} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search food or Category..."
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </form>
  );
};

export default SearchBar;