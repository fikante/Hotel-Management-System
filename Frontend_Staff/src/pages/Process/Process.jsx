import React from "react";
import AddGuest from "../Guests/AddGuest";
import RoomList from "../Room/RoomList";
import AddBooking from "../Reservations/AddBooking";
import { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
import { roomDatabase } from "@/TestData/roomDataTest";

const Process = () => {
  const [activeButton, setActiveButton] = useState("profile");
  const handleOnClick = (val) => {
    setActiveButton(val);
  };
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <div className="p-4 flex justify-center items-center h-screen w-1/2 ">
      <div className="flex flex-col rounded-3xl flex-1 p-8 bg-white">
        <div className="flex flex-row border-b  w-fill text-[#718EBF] gap-12">
          <button
            className={`items-center ${
              activeButton === "profile"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("profile")}
          >
            Create Profile
          </button>
          <button
            className={` items-center ${
              activeButton === "room"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("room")}
          >
            Select Room
          </button>
          <button
            className={` items-center ${
              activeButton === "booking"
                ? "border-b-2  text-[#1814F3] border-[#1814F3]"
                : ""
            }  `}
            onClick={() => handleOnClick("booking")}
          >
            Booking
          </button>
        </div>
        {activeButton === "profile" && <AddGuest />}
        {activeButton === "room" && (
          <div className="p-2">
            <CustomTable
              data={roomDatabase}
              columns={roomSelection}
              EnableSelection={true}
              onSelectionChange={setSelectedRoom}
              pageSize={5}
              maxWidth="32"
            />
          </div>
        )}
        {activeButton === "booking" && <AddBooking />}
      </div>
    </div>
  );
};
export default Process;
