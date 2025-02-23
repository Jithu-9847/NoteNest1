import React from 'react';
import card1 from './card.svg';

const EventCard = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">LOREM PUBLIC ACADEMY</div>
        <p className="text-gray-700 text-base">
          UPCOMING EVENTS 2048
        </p>
        <p className="text-gray-700 text-base mt-2">
          CHECK OUT OUR UPCOMING EVENTS FOR THIS YEAR'S CALENDAR
        </p>
      </div>

      <div className="  bg-orange-500">
        <div className="flex items-center mb-4" style={{ backgroundImage: `url(${card1})`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
          <div className="text-2xl font-bold text-gray-800 mr-4">APR</div>
          <div>
            <div className="text-lg font-semibold text-gray-800">ARTS & CRAFTS NIGHT</div>
            <div className="text-sm text-gray-600">10 AT LOREM STREET, NEAR DOLOR ST AMET, CITY NAME</div>
            <div className="text-sm text-gray-600">10AM - 4PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;