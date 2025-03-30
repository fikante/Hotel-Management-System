import React from "react";

const RoomDetail = ({ row }) => {
  return (
    <div className="flex flex-row items-start gap-3">
      <img
        src={row.original.picture}
        alt="Room"
        className="object-cover size-24 rounded-lg shrink-0"
      />

      <div className="flex flex-col gap-1">
        <p className=" text-sm text-gray-600 whitespace-normal break-words">
          {row.original.description}
        </p>

        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <img src="/size.svg" alt="Size" className="size-4" />
            <span>{row.original.size} sq-ft</span>
          </div>

          <div className="flex items-center gap-1">
            <img src="/occupancy.svg" alt="Occupancy" className="size-4" />
            <span>Max {row.original.maxOccupancy} people</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {row.original.amenities?.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="bg-gray-100 text-xs rounded-full px-2 py-0.5"
            >
              {amenity}
            </span>
          ))}
          {row.original.amenities?.length > 3 && (
            <span className="bg-gray-100 text-xs rounded-full px-2 py-0.5">
              +{row.original.amenities.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
