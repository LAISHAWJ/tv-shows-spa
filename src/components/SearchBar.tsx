import React, { useEffect, useState } from 'react';
interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Buscar series...' }) => {
  const [local, setLocal] = useState(value);

  // debounce simple
  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  useEffect(() => setLocal(value), [value]);

  return (
    <div className="searchbar">
      <input
        aria-label="Buscar series"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button className="clear-btn" onClick={() => { setLocal(''); onChange(''); }} title="Limpiar">✕</button>
    </div>
  );
};
