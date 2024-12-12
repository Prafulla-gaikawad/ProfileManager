const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search profiles..."
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchBar;
