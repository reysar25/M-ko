function EventCard({event}) {
    return (
        <div className="overflow-auto rounded-2xl">
            <img className="w-xs" src={event.image} alt={event.name} />
            <h3 className="font-bold underline">{event.name}</h3>
            <p>Venue: {event.venue}</p>
            <p>Price: {event.price}</p>
            <div className="grid">
                <button className="bg-blue-400 hover:bg-blue-700 cursor-pointer">Buy Ticket</button>
                <button className="bg-blue-400 hover:bg-blue-700 cursor-pointer">Add To Wishlist</button>
            </div>
        </div>

    )
}

export default EventCard