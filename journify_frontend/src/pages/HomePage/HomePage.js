import React, { useState } from "react";
import NestedGrid from "../../components/Grid/Grid";
import Navbar from "../../components/Navbar/Navbar";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Vacation Planner</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="searchInput">Enter preferences:</label>
          <input
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">Enter</button>
        </form>
      </div>
      <NestedGrid />
    </>
  );
}

export default HomePage;
