import React, { useState } from "react";
import RoomSelection from "../Room/RoomSelection";
import SelectGuest from "../Guests/SelectGuest";

const SelectGuestAndBooking = ({ onSuccess }) => {
  const [activeButton, setActiveButton] = useState("guest");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [bookingFormData, setBookingFormData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setActiveButton("book");
  };

  const handleRoomSelection = (e) => {
    e.preventDefault();
    onSuccess();
    console.log(selectedGuest, selectedRoom, bookingFormData);
  };

  return (
    <div className="flex flex-col flex-1 p-4 bg-white w-full h-full ">
      <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
        <button
          className={`items-center ${
            activeButton === "guest"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("guest")}
        >
          Select Guest
        </button>
        <button
          className={`items-center ${
            activeButton === "book"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
        >
          Select Room
        </button>
      </div>

      {activeButton === "guest" && (
        <SelectGuest
          setSelectedGuest={setSelectedGuest}
          bookingFormData={bookingFormData}
          handleBookingChange={handleBookingChange}
          handleBookingSubmit={handleBookingSubmit}
          selectedGuest={selectedGuest}
        />
      )}

      {activeButton === "book" && (
        <RoomSelection
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
          handleRoomSelection={handleRoomSelection}
        />
      )}
    </div>
  );
};

export default SelectGuestAndBooking;
