import React, { useEffect } from "react";

function Code() {
  const newUrl = "https://pasteit-kohl.vercel.app/";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = newUrl;
    }, 5000);

    return () => clearTimeout(timer);
  }, [newUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-4">⚠️ Page Moved</h1>
        <p className="text-gray-300 mb-2">This page has moved to:</p>
        <a
          href={newUrl}
          className="text-indigo-400 hover:text-indigo-600 underline break-words"
        >
          {newUrl}
        </a>
        <p className="text-gray-400 mt-4">
          Redirecting in <span className="font-semibold">5 seconds...</span>
        </p>
      </div>
    </div>
  );
}

export default Code;