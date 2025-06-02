import { useState } from "react";

function SearchFilterBar({ onSearch, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="bg-blue-200 px-6 py-3 flex justify-center gap-4 sticky top-[56px] z-40 shadow-md">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md px-3 py-1 text-black"
          aria-label="Search"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-r-md"
        >
          Search
        </button>
      </form>

      <select
        value={filter}
        onChange={handleFilterChange}
        className="rounded-md px-3 py-1 cursor-pointer"
        aria-label="Filter"
      >
        <option value="all">All Genres</option>
        <option value="jazz">Jazz</option>
        <option value="indie">Indie Rock</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;
