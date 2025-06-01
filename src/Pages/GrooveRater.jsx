// GrooveRater.jsx
import React, { useState } from 'react';
import { StarIcon, CalendarIcon, LocationMarkerIcon, MusicalNoteIcon } from '@heroicons/react/solid';

const GrooveRater = () => {
  // Sample data - would come from backend in real app
  const [grooves, setGrooves] = useState([
    {
      id: 1,
      title: "Jazz Night at Bebop Lounge",
      organizer: "City Jazz Collective",
      date: "2023-08-15",
      location: "Downtown Arts District",
      genre: "Jazz",
      rating: 4.2,
      reviews: [
        { user: "MusicLover42", rating: 5, comment: "Incredible atmosphere and talented musicians!" },
        { user: "GrooveMaster", rating: 4, comment: "Great venue but drinks were pricey" }
      ]
    },
    {
      id: 2,
      title: "Indie Summer Fest",
      organizer: "Local Sounds Inc",
      date: "2023-08-22",
      location: "Riverside Park",
      genre: "Indie Rock",
      rating: 4.7,
      reviews: []
    }
  ]);

  const [selectedGroove, setSelectedGroove] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    
    const updatedGrooves = grooves.map(groove => 
      groove.id === selectedGroove.id
        ? { 
            ...groove, 
            reviews: [...groove.reviews, { 
              user: "CurrentUser", 
              ...newReview 
            }] 
          }
        : groove
    );
    
    setGrooves(updatedGrooves);
    setSelectedGroove(updatedGrooves.find(g => g.id === selectedGroove.id));
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">Groove Rater</h1>
        <p className="text-gray-600 text-lg">
          Discover, attend, and review local small concerts
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Search grooves..." 
            className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <select className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500">
            <option>All Genres</option>
            <option>Jazz</option>
            <option>Rock</option>
            <option>Electronic</option>
            <option>Folk</option>
          </select>
          <input 
            type="date" 
            className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 text-white rounded-lg p-3 hover:bg-purple-700 transition">
            Find Grooves
          </button>
        </div>
      </div>

      {/* Grooves List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {grooves.map(groove => (
          <div 
            key={groove.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedGroove(groove)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">{groove.title}</h2>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {groove.genre}
                </span>
              </div>
              
              <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-purple-600 mr-2" />
                  {new Date(groove.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <LocationMarkerIcon className="h-5 w-5 text-purple-600 mr-2" />
                  {groove.location}
                </div>
                <div className="flex items-center">
                  <MusicalNoteIcon className="h-5 w-5 text-purple-600 mr-2" />
                  {groove.organizer}
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(groove.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-500">
                  ({groove.reviews.length} reviews)
                </span>
              </div>
              
              <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Groove Detail & Review Section */}
      {selectedGroove && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button 
            onClick={() => setSelectedGroove(null)}
            className="mb-6 text-purple-600 hover:text-purple-800 flex items-center"
          >
            ← Back to all grooves
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Groove Details */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedGroove.title}</h2>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-6 w-6 ${i < Math.floor(selectedGroove.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-500 text-lg">
                  {selectedGroove.rating.toFixed(1)} ({selectedGroove.reviews.length} reviews)
                </span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Date & Time</h3>
                  <p>{new Date(selectedGroove.date).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Location</h3>
                  <p>{selectedGroove.location}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Organizer</h3>
                  <p className="text-purple-600 font-medium">{selectedGroove.organizer}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Description</h3>
                  <p>Join us for an intimate evening of live music featuring both established and up-and-coming artists in a cozy atmosphere perfect for music lovers.</p>
                </div>
              </div>
              
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                Set Reminder & Book Tickets
              </button>
            </div>
            
            {/* Reviews Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
              
              {/* Review Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Share Your Experience</h4>
                <form onSubmit={handleSubmitReview}>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-8 w-8 cursor-pointer ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setNewReview({...newReview, rating: i+1})}
                      />
                    ))}
                  </div>
                  
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share details of your experience..."
                    className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-500"
                    rows="3"
                  />
                  
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
              
              {/* Reviews List */}
              <div className="space-y-6">
                {selectedGroove.reviews.length > 0 ? (
                  selectedGroove.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No reviews yet. Be the first to share your experience!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrooveRater;