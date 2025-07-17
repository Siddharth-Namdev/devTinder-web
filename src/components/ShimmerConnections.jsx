import React from "react";

const ShimmerConnections = () => {
  return (
    <div className="text-center my-10 px-4 animate-pulse">
      <h1 className="font-extrabold text-4xl text-red-700 mb-10 tracking-wide">
        No Connections...
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 border border-indigo-200 rounded-3xl shadow-md p-6"
            >
              <div className="flex items-center space-x-5">
                <div className="w-20 h-20 rounded-full bg-indigo-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-indigo-300 rounded"></div>
                  <div className="w-1/2 h-3 bg-indigo-200 rounded"></div>
                  <div className="w-full h-3 bg-indigo-100 rounded"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShimmerConnections;
