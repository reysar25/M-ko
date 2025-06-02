import React, { useState } from 'react';

const EventSubmissionForm = () => {
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        date: '',
        organizer: '',
        ticket_price: 0
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: name === 'ticket_price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to submit event');
            }

            const result = await response.json();
            
            setSubmissionStatus({ success: true, message: 'Event submitted successfully!' });
            setEventData({
                name: '',
                description: '',
                date: '',
                organizer: '',
                ticket_price: 0
            });
        } catch (error) {
            setSubmissionStatus({ success: false, message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Event</h2>
            
            {submissionStatus && (
                <div className={`mb-4 p-4 rounded ${submissionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submissionStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                        Event Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="description">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="date">
                        Date *
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="organizer">
                        Organizer *
                    </label>
                    <input
                        type="text"
                        id="organizer"
                        name="organizer"
                        value={eventData.organizer}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="ticket_price">
                        Ticket Price (USD) *
                    </label>
                    <input
                        type="number"
                        id="ticket_price"
                        name="ticket_price"
                        min="0"
                        step="0.01"
                        value={eventData.ticket_price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventSubmissionForm;
         
       