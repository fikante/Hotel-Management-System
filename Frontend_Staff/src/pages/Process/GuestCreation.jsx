import React, { useState } from "react";
import AddGuest from "../Guests/AddGuest";
import RoomSelection from "../Room/RoomSelection";

const UserProfileAndBooking = ({ onSuccess }) => {
  const [activeButton, setActiveButton] = useState("profile");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [guestFormData, setGuestFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    idType: "",
    idNumber: "",
  });

  const [bookingFormData, setBookingFormData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const handleGuestFormSubmit = (formData) => {
    setActiveButton("book");
  };

  
  const handleRoomSelection = (e) => {
    e.preventDefault();
    onSuccess();
    console.log(selectedRoom, bookingFormData, guestFormData);
  }

  return (
    <div className="flex flex-col flex-1 p-4 bg-white w-full h-full ">
      <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
        <button
          className={`items-center ${
            activeButton === "profile"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("profile")}
        >
          Create Profile
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

      {activeButton === "profile" && (
        <AddGuest
          formData={guestFormData}
          setFormData={setGuestFormData}
          onSubmit={handleGuestFormSubmit}
          setBookingFormData={setBookingFormData}
          bookingFormData={bookingFormData}
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

export default UserProfileAndBooking;
