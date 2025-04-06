import React, { useState } from "react";
import RoomSelection from "../Room/RoomSelection";
import SelectGuest from "../Guests/SelectGuest";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const SelectGuestAndBooking = ({ onSuccess }) => {
  const [activeButton, setActiveButton] = useState("guest");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [room, setRoom] = useState([]);
  const [isRoomLoading, setIsRoomLoading] = useState(true);
  const [roomError, setRoomError] = useState(null);
  


  // localhost:3000/api/v1/hotels/1/rooms/:roomId/bookings
  // Body
  // json
  // {
  //   "guestId": "da68fd79-9d74-4317-bb18-a0683ea837fe",
  //   "checkIn": "2025-07-02T12:00:00Z",
  //   "checkOut": "2025-08-05T12:00:00Z"
  // }

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
