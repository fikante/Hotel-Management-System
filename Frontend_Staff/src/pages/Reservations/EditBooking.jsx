import { Button } from "@/components/ui/button";
import React from "react";
import { useState, useEffect } from "react";
import {  useForm } from "react-hook-form";
import { roomDatabase } from "@/TestData/roomDataTest";
import { CustomTable } from "@/components/Table/Table";
import { roomSelection } from "@/components/Room/roomSelection";
import { ArrowDownCircle } from "lucide-react";
import { useReservationStore } from "@/components/store/useReservationStore";
import SpinPage from "@/components/Spin/Spin";
import { api } from "@/lib/api";

const EditBooking = ({ reservationData, onSuccess }) => {
  const { editReservation } = useReservationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [searchRoomIsLoading, setSearchRoomIsLoading] = useState(false);
  const [room, setRoom] = useState([]);
  const [error, setError] = useState(null);
  const form = useForm({
    defaultValues: {
      checkIn: reservationData.checkIn,
      checkOut: reservationData.checkOut,
      status: reservationData.bookingStatus,
    },
  });
  const [showTable, setShowTable] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (reservationData) {
      reset({
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        status: reservationData.bookingStatus,
      });
    }
  }, [reservationData, reset]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      room: selectedRoom,
    };
    setIsLoading(true);
    setError(null);
    try {
      await editReservation(reservationData?.bookingId, updatedData);
      alert("Reservation updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError("Failed to update reservation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomSelection = async (e) => {
    e.preventDefault();
    if (!reservationData.checkIn || !reservationData.checkOut) {
      alert("Please select check-in and check-out dates first.");
      return;
    }
    setSearchRoomIsLoading(true);
    setError(null);
    try {
      // console.log("Fetching rooms from:", `/hotels/1/availablerooms?check_in=${reservationData.checkIn}&check_out=${reservationData.checkOut}`);
      const response = await api.get(
        `/hotels/1/availablerooms?check_in=${reservationData.checkIn}&check_out=${reservationData.checkOut}`
      );
      const data = response.data.data;
      const formattedRoom = data.map((room) => ({
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.type,
        price: room.price,
        status: room.status,
        size: room.size,
        maxOccupancy: room.occupancy,
        bedType: room.bedType,
        amenities: room.amenities.map((amenity) => amenity.name),
      }));
      console.log(formattedRoom);
      setRoom(formattedRoom);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching room:", error);
      setRoom([]);
      setShowTable(true);
      setError("Failed to load room");
    } finally {
      setSearchRoomIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col justify-center font-serif gap-6 p-2">
      <h2 className="text-2xl font-semibold">Edit Reservation</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
        id="editBookingForm"
      >
        <div className="flex flex-row gap-6 w-full  items-start">
          <div className="flex flex-col  gap-2 w-full">
            <label className="text-[#232323] " htmlFor="checkIn">
              Check-In Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              {...register("checkIn", {
                required: {
                  value: true,
                  message: "Check-In Date is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.checkIn ? "border-red-500" : ""
              }`}
            />
            {errors.checkIn && (
              <span className="text-red-500">{errors.checkIn.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#232323] " htmlFor="checkOut">
              Check-Out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              {...register("checkOut", {
                required: {
                  value: true,
                  message: "Check-Out Date is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.checkOut ? "border-red-500" : ""
              }`}
            />
            {errors.checkOut && (
              <span className="text-red-500">{errors.checkOut.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#232323] " htmlFor="status">
              Status</label>
            <select

              id="status"
              name="status"
              {...register("status", {
                required: {
                  value: true,
                  message: "Status is required",
                },
              })}
              className={`border border-gray-300 rounded-md p-2 w-full ${
                errors.status ? "border-red-500" : ""
              }`}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>
        </div>
        {!showTable && (
          <div className="items-end flex">
            <Button
              variant="default"
              className="bg-blue-500 text-white rounded-lg p-5 hover:bg-blue-600"
              onClick={handleRoomSelection}
              data-testid="room-selection-button"
            >
              Select New Room
              <ArrowDownCircle className="ml-2" size={20} />
            </Button>
          </div>
        )}
      </form>
      {showTable && (
        <div className="w-full">
          <CustomTable
            columns={roomSelection}
            data={room}
            onSelectionChange={setSelectedRoom}
            EnableSelection={true}
            pageSize={4}
          />
        </div>
      )}
      {searchRoomIsLoading && (
        <div className="flex justify-center items-center">
          <SpinPage />
        </div>
      )}
      <div className="flex justify-end w-full">
        <Button
          type="submit"
          form="editBookingForm"
          className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-800"
        >
          Update Reservation
        </Button>
      </div>
    </div>
  );
};

export default EditBooking;
