import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

function AddEventPage() {
    const navigate = useNavigate(); 

    const [newEvent, setNewEvent] = useState({
        name: '',
        genre: '',
        date: '',
        location: '',
        organizer: '',
        description: '',
        rating: 5,
        reviews: [],
        image: '',
        ticket: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    };

    
    const handleAddEvent = async (e) => {
        e.preventDefault(); 

        if (!newEvent.name || !newEvent.date || !newEvent.location) {
            toast.error('Please fill in all required fields (Name, Date, Location).');
            return;
        }

        const eventToSubmit = {
            title: newEvent.name, 
            rating: 0, 
            reviews: [],
            ...newEvent, 
        };

        try {
            //Post 
            console.log('Simulating adding event:', eventToSubmit);
            toast.success(`"${eventToSubmit.name}" added successfully!`);

            setNewEvent({
                name: '',
                genre: '',
                date: '',
                location: '',
                organizer: '',
                description: '',
                image: '',
                ticket: ''
            });

            navigate('/'); 

        } catch (error) {
            console.error('Error adding event:', error);
            toast.error(`Failed to add event: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Event Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newEvent.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Music Festival"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={newEvent.genre}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Music, Sports, Film"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2" focus="ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={newEvent.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Central Park, NYC"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 mb-1">Organizer <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="organizer"
                        name="organizer"
                        value={newEvent.organizer}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Live Nation"
                        required
                    />
                </div>

\                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea
                        id="description"
                        name="description"
                        value={newEvent.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Provide a detailed description of the event..."
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={newEvent.image}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., https://example.com/event-banner.jpg"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="ticket" className="block text-sm font-medium text-gray-700 mb-1">Ticket URL <span className="text-red-500">*</span></label>
                    <input
                        type="url"
                        id="ticket"
                        name="ticket"
                        value={newEvent.ticket}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., https://example.com/buy-tickets/123"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
}

export default AddEventPage;