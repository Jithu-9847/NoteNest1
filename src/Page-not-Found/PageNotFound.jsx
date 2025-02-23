// src/components/LonelyPageNotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-6xl font-bold text-blue-400 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-300 mb-2">Looks like you're alone here...</p>
      <p className="text-xl text-gray-300 mb-6">Don't worry, even the internet feels lonely sometimes.</p>
      <img
        src="https://img.freepik.com/premium-vector/boy-sitting-dark-night-ai-generated-image_362642-1869.jpg?semt=ais_hybrid"
        alt="Lonely Boy"
        className="w-96 rounded-lg shadow-lg mb-6"
      />
      <p className="text-xl text-gray-300 mb-4">But hey, we can fix that!</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Take Me Back to Civilization!
      </button>
    </div>
  );
};

export default PageNotFound;