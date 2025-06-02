import React from 'react';
import EventSubmissionForm from './Pages/EventSubmission';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">M-ko Events Management</h1>
                    <p className="text-gray-600 mt-2">Submit your event to reach a wider audience</p>
                </header>
                
                <EventSubmissionForm />
            </div>
        </div>
    );
}

export default App;
