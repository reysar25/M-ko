import { useOutletContext } from "react-router-dom";
import EventCard from "../Components/EventCard";

function WishlistPage() {
  const { searchTerm, filter, wishlistItems, setWishlistItems } = useOutletContext();

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
          filteredItems.map((event, index) => (
            <EventCard 
              event={event} 
              key={index}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
            />
          ))
        ) : (
          <p className="text-gray-600">No wishlist items match your criteria.</p>
        )}
      </div>
    </>
  );
}

export default WishlistPage;