import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { reservationDatabase } from "../../TestData/reservationDatabase.js";

const ReservationList = () => {
  const handleDelete = (id) => {
    alert(`Delete ${id}`);
  };
  const handleEdit = (id) => {
    alert(`Edit ${id}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-700 w-24">Booking ID</TableHead>
            <TableHead className="text-gray-700 w-24">Guest Name</TableHead>
            <TableHead className="text-gray-700 w-24">Room ID</TableHead>
            <TableHead className="text-gray-700 w-24">Booking Type</TableHead>
            <TableHead className="text-gray-700 w-24">Room Type</TableHead>
            <TableHead className="text-gray-700 w-24">Check-In</TableHead>
            <TableHead className="text-gray-700 w-24">Check-Out</TableHead>
            <TableHead className="text-gray-700 w-24">Status</TableHead>
            <TableHead className="text-gray-700 w-24">Booked Via</TableHead>
            <TableHead className="text-gray-700 w-24">Created At</TableHead>
            <TableHead className="text-gray-700 w-24">Quick Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservationDatabase.map((reservation) => (
            <TableRow key={reservation.id} className="hover:bg-gray-100">
              <TableCell>{reservation.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div>
                    {reservation.first_name} {reservation.last_name}
                  </div>
                  <div className="text-sm text-gray-300">
                    {reservation.guest_id}
                  </div>
                </div>
              </TableCell>
              <TableCell>{reservation.room_id}</TableCell>
              <TableCell>{reservation.booking_type}</TableCell>
              <TableCell>{reservation.room_type}</TableCell>
              <TableCell>{reservation.check_in}</TableCell>
              <TableCell>{reservation.check_out}</TableCell>
              <TableCell>{reservation.booking_status}</TableCell>
              <TableCell>{reservation.booking_via}</TableCell>
              <TableCell>{reservation.created_at}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(reservation.id)}
                    className="hover:bg-gray-400"
                  >
                    <Edit className="text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(reservation.id)}
                    className="hover:bg-gray-400"
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationList;
