import React from 'react';
import { Link } from 'react-router-dom';

function S6() {
  const courses = [
    { name: 'AAD', value: 'AAD' },
    { name: 'CCW', value: 'CCW' },
    { name: 'CD', value: 'CD' },
    { name: 'CG', value: 'CG' },
    { name: 'ELI', value: 'ELI' },
    { name: 'IE&FT', value: 'IE&FT' },
    { name: 'NW LAB', value: 'NW LAB' },
    
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Select a Course</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {courses.map((course) => (
          <Link
            key={course.name}
            to="/Files"
            state={{ value: course.value }}
            className="transition transform hover:scale-105"
          >
            <button
              className={`w-full py-3 px-4 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                course.value.toLowerCase().includes('lab') ? 'bg-red-600 hover:bg-red-500' : ''
              }`}
            >
              {course.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-400">
        <p>Notifications or additional information can be added here.</p>
      </div>
    </div>
  );
}

export default S6;
