import React from "react";

const RequestsShimmer = () => {
  return (
    <div className="text-center my-10 animate-pulse">
      <h1 className="text-bold text-white text-3xl mb-6">Requests</h1>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto w-2/3"
        >
          {/* Profile pic shimmer */}
          <div>
            <div className="w-20 h-20 rounded-full bg-slate-500 opacity-30" />
          </div>

          {/* User info shimmer */}
          <div className="text-left mx-4 flex-1">
            <div className="h-5 w-40 bg-slate-500 rounded opacity-30 mb-2" />
            <div className="h-4 w-24 bg-slate-500 rounded opacity-30 mb-1" />
            <div className="h-4 w-32 bg-slate-500 rounded opacity-30" />
          </div>

          {/* Buttons shimmer */}
          <div className="flex gap-4">
            <div className="h-10 w-20 bg-slate-500 rounded opacity-30" />
            <div className="h-10 w-20 bg-slate-500 rounded opacity-30" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestsShimmer;
