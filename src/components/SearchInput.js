function SearchInput({ value, onChange }) {
  return (
    <div className="search-input-container relative self-center mt-6 mb-3">
      <span className="absolute search-input-icon">
        <img src="/svgs/search.svg" alt="Search assets" />
      </span>
      <input
        type="text"
        value={value}
        className="search-input rounded-md text-base py-3 pr-5 pl-7 inline-block w-full outline-none"
        placeholder="Search by asset name or tag"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchInput;
