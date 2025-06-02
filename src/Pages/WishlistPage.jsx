import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventCard from "../Components/EventCard";

function WishlistPage() {
  const { searchTerm, filter } = useOutletContext();

  

  // Filter wishlist items based on searchTerm and filter state
  const filteredItems = wishlistItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      item.genre.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-wrap overflow-auto gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <EventCard event={item} key={index} />
          ))
        ) : (
          <p className="text-gray-600">No wishlist items match your criteria.</p>
        )}
      </div>
    </>
  );
}

export default WishlistPage;
