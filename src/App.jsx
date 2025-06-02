import { useState,useEffect } from "react";
import NavBar from "./Components/NavBar";
import SearchFilterBar from "./Components/SearchFilterBar"; 
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [wishlistItems, setWishlistItems] = useState([]);
    const [events, setEvents] = useState([]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    console.log("Filter changed:", value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <>
      <NavBar />
      <SearchFilterBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <ToastContainer />
      <Outlet context={{ searchTerm, filter, wishlistItems, setWishlistItems, events, setEvents }} />
    </>
  );
}

export default App;
