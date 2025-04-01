import React, { useState } from "react";
import AddGuest from "../Guests/AddGuest";
import AddBooking from "../Reservations/AddBooking";

const UserProfileAndBooking = ({onSuccess}) => {
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

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingFormData.checkIn || !bookingFormData.checkOut) {
      alert("Please fill in all fields.");
      return;
    }
    if (
      new Date(bookingFormData.checkOut) <= new Date(bookingFormData.checkIn)
    ) {
      alert("Check-Out date must be after Check-In date.");
      return;
    }
    if (!selectedRoom) {
      alert("Please select a room.");
      return;
    }
    onSuccess()
    alert(`
      Room Number ${selectedRoom.roomNumber}
      Checkin ${bookingFormData.checkIn}
      Checkout ${bookingFormData.checkOut}
      Name ${guestFormData.firstName + " " + guestFormData.lastName}
    `);
  };

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
            Booking
          </button>
        </div>

        {activeButton === "profile" && (
          <AddGuest
            formData={guestFormData}
            setFormData={setGuestFormData}
            onSubmit={handleGuestFormSubmit}
          />
        )}

        {activeButton === "book" && (
          <AddBooking
            bookingFormData={bookingFormData}
            handleBookingChange={handleBookingChange}
            handleBookingSubmit={handleBookingSubmit}
            setSelectedRoom={setSelectedRoom}
          />
        )}
      </div>
  );
};

export default UserProfileAndBooking;
