/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { IoSearch } from "react-icons/io5";

function SearchBox({ value, onChange, onSearch, placeholder = "검색어를 입력하세요.", children}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div css={s.searchBox}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        css={s.searchInput}
        onKeyDown={handleKeyDown}
      />
      <button css={s.searchButton} onClick={onSearch}>
        <IoSearch />
      </button>
      {children}
    </div>
  );
}

export default SearchBox;