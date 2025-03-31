import React from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
import { roomDatabase } from "@/TestData/roomDataTest";
import { Button } from "@/components/ui/button";

const AddBooking = ({
  bookingFormData,
  handleBookingChange,
  handleBookingSubmit,
  setSelectedRoom,
}) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <form>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-In Date
              </label>
              <input
                type="date"
                name="checkIn"
                value={bookingFormData.checkIn}
                onChange={handleBookingChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Check-Out Date
              </label>
              <input
                type="date"
                name="checkOut"
                value={bookingFormData.checkOut}
                onChange={handleBookingChange}
                required
                min={bookingFormData.checkIn}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-between items-center">
        <div className="h-0.5 bg-gray-200 w-2/5"></div>
        <div>Select Room</div>
        <div className="h-0.5 bg-gray-200 w-2/5"></div>
      </div>
      <CustomTable
        data={roomDatabase}
        columns={roomSelection}
        EnableSelection={true}
        onSelectionChange={setSelectedRoom}
        pageSize={5}
        maxWidth="32"
      />

      <div className="flex justify-center -mt-2">
        <Button
          variant="default"
          onClick={handleBookingSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-1/4"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddBooking;
