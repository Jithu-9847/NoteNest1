import React from "react";

function Code() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          This page has moved
        </h1>
        <p className="text-gray-600 mb-4">
          Please visit our new website:
        </p>
        <a
          href="https://pasteit-kohl.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium underline hover:text-blue-800"
        >
          Click Here🫣
        </a>
      </div>
    </div>
  );
}

export default Code;