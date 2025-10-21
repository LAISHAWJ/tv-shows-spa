import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Input.Search
      placeholder="Buscar series..."
      value={query}
      onChange={handleSearch}
      className="mb-6 max-w-lg mx-auto"
      size="large"
      style={{ backgroundColor: '#333', borderColor: '#444', color: '#fff' }}
    />
  );
};

export default SearchBar;