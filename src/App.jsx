import { useState } from "react";
import NavBar from "./Components/NavBar";
import SearchFilterBar from "./Components/SearchFilterBar"; // import it
import { Outlet } from "react-router-dom";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [wishlistItems, setWishlistItems] = useState([]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    console.log("Filter changed:", value);
  };

  return (
    <>
      <NavBar />
      <SearchFilterBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <Outlet context={{ searchTerm, filter, wishlistItems, setWishlistItems }} />
    </>
  );
}

export default App;
