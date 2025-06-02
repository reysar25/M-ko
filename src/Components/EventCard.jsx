import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function EventCard({ event, wishlistItems, setWishlistItems }) {
    const navigate = useNavigate()
    const isInWishlist = useMemo(() => 
        wishlistItems.some(item => item.id === event.id), 
        [wishlistItems, event.id]
    );

    const toggleWishlist = () => {
        if (isInWishlist) {
            setWishlistItems(prev => prev.filter(item => item.id !== event.id));
        } else {
            setWishlistItems(prev => [...prev, { ...event, addedAt: new Date().toISOString() }]);
        }
    };

    const bookTickets = () => {
        alert(`Booking tickets for ${event.title}`);
        navigate(`${event.ticket}`)

    };

    return (
        <div className="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                    {event.genre}
                </span>
            </div>

            <div className="space-y-1 text-gray-600 text-sm mb-4">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
            </div>

            <div className="flex items-center text-yellow-500 text-sm mb-4">
                {'★'.repeat(Math.floor(event.rating))}{'☆'.repeat(5 - Math.floor(event.rating))}
                <span className="ml-2 text-gray-500">
                    ({event.reviews.length || 0} reviews)
                </span>
            </div>

            <div className="space-y-2">
                <button 
                    onClick={toggleWishlist}
                    className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                        isInWishlist 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-blue-500 hover:bg-blue-700 text-gray-700'
                    }`}
                >
                    {isInWishlist ? ' Remove from Wishlist' : ' Add to Wishlist'}
                </button>
                
                <button 
                    onClick={bookTickets}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                    Book Tickets
                </button>
            </div>
        </div>
    );
}

export default EventCard;