import React from "react";

const SearchComponent = ({ searchTerm, handleChange }) => {
  return (
    <div className="dropdown dropdown-end">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchComponent;
