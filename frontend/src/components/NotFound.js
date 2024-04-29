// src/components/NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full p-48 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
