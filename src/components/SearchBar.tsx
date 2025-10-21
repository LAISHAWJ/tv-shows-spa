import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    debouncedSearch(query.trim());
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="flex items-center gap-2 max-w-md mx-auto fade-in">
      <Input
        placeholder="Buscar series..."
        value={query}
        onChange={handleInputChange}
        onPressEnter={handleSearch}
        prefix={<SearchOutlined className="text-emerald-green" />}
        className="flex-1 bg-black-bg border-emerald-dark text-white placeholder-light-gray"
        size="large"
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        size="large"
        className="bg-emerald-green hover:bg-emerald-dark glow-hover"
      >
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;