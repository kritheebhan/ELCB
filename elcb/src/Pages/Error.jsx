import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-700 mt-2">Oops! Page Not Found</p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default Error;
