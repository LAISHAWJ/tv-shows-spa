import { Input } from 'antd';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);  // Lifting state
  };

  return (
    <Input.Search
      placeholder="Buscar series..."
      value={query}
      onChange={handleSearch}
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;