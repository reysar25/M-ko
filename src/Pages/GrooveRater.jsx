import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { auth } from '../Components/firebase';

const GrooveRater = () => {
  const {events, setEvents} = useOutletContext()
  
  

  const [selectedGroove, setSelectedGroove] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleSubmitReview = (e) => {
  e.preventDefault();
  if (!newReview.comment.trim()) return;

  const updatedGrooves = events.map(event => {
    if (event.id === selectedGroove.id) {
      const updatedReviews = [...event.reviews, {
        user: auth.currentUser.email,
        ...newReview
      }];

      const newAvgRating = (
        updatedReviews.reduce((acc, review) => acc + review.rating, 0) / updatedReviews.length
      );

      return {
        ...event,
        reviews: updatedReviews,
        rating: newAvgRating
      };
    } else {
      return event;
    }
  });

  setEvents(updatedGrooves);
  setSelectedGroove(updatedGrooves.find(g => g.id === selectedGroove.id));
  setNewReview({ rating: 5, comment: "" });
};


  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Groove Rater</h1>
        <p className="text-gray-600 text-lg">
          Discover, attend, and review local small concerts
        </p>
      </div>

      
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {events.map(event => (
          <div 
            key={event.id}
            className="bg-white rounded-xl shadow-2xl shadow-gray-700 overflow-hidden hover:shadow-lg transition cursor-pointer"
            
          >
            <div className='flex justify-center items-center pb-0.5'>
                <img src ={`${event.image}`} alt ={`${event.name}`} className='w-60 h-60'/>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800"
                  onClick={() => {
                    setSelectedGroove(event);
                    window.location.hash = 'reviews';
                    setTimeout(() => {
                      window.location.hash = '';
                    }, 10000);
                    
                  }}>{event.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {event.genre}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-gray-600 text-sm">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
              </div>

              <div className="mt-4 flex items-center text-yellow-500 text-sm">
                {'★'.repeat(Math.floor(event.rating)) + '☆'.repeat(5 - Math.floor(event.rating))}
                <span className="ml-2 text-gray-500">
                  ({event.reviews.length} reviews)
                </span>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedGroove && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button 
            onClick={() => setSelectedGroove(null)}
            className="mb-6 text-blue-600 hover:text-blue-800"
          >
            ← Back to all grooves
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id = "reviews">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedGroove.title}</h2>
              <div className="flex items-center mb-6 text-yellow-500 text-lg">
                {'★'.repeat(Math.floor(selectedGroove.rating)) + '☆'.repeat(5 - Math.floor(selectedGroove.rating))}
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
                  <p className="text-blue-600 font-medium">{selectedGroove.organizer}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Description</h3>
                  <p>
                    {selectedGroove.description}
                  </p>
                </div>
              </div>

              
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Share Your Experience</h4>
                <form onSubmit={handleSubmitReview}>
                  <div className="flex mb-4 text-yellow-500 text-xl cursor-pointer">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      >
                        {i < newReview.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>

                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share details of your experience..."
                    className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                {selectedGroove.reviews.length > 0 ? (
                  selectedGroove.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="text-yellow-500 text-sm">
                          {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
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
