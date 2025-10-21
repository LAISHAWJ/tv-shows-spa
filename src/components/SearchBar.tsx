import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      debouncedSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="mb-6 max-w-lg mx-auto flex gap-2 fade-in">
      <Input
        placeholder="Buscar series..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        size="large"
        prefix={<SearchOutlined className="text-emerald-green" />}
        style={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
        className="flex-1"
      />
      <Button
        type="primary"
        onClick={handleSearch}
        size="large"
        icon={<SearchOutlined />}
        style={{ backgroundColor: '#50C878', borderColor: '#50C878' }}
        className="hover:bg-emerald-dark transition-all duration-300"
      >
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;