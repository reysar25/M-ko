import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventCard from "../Components/EventCard";

function HomePage() {
  const { searchTerm, filter,setWishlistItems, wishlistItems, events } = useOutletContext();

  

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      event.genre.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-wrap overflow-auto gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard event={event} key={index} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}/>
          ))
        ) : (
          <p className="text-gray-600">No events match your criteria.</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
