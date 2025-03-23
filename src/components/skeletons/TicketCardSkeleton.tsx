import React from "react";

const TicketCardSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6 animate-pulse w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="badge h-6 w-16 bg-base-300"></div>
          <div className="badge h-6 w-16 bg-base-300"></div>
        </div>
        <div className="h-4 w-20 bg-base-300 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-base-300 rounded mb-2"></div>
      <div className="h-4 w-full bg-base-300 rounded mb-4"></div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-base-300 rounded-full"></div>
          <div className="h-4 w-16 bg-base-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-base-300 rounded-full"></div>
          <div className="h-4 w-16 bg-base-300 rounded"></div>
        </div>
      </div>
      <div className="mt-4 h-9 w-full bg-base-300 rounded"></div>
    </div>
  );
};

export default TicketCardSkeleton;