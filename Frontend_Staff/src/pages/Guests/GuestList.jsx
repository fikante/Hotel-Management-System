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
import { guestDatabase } from "../../TestData/dataTest.js";
import { Edit, Trash2 } from "lucide-react";

const GuestList = () => {
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
            <TableHead className="text-gray-700 w-20">Guest ID</TableHead>
            <TableHead className="text-gray-700 w-24">Full Name</TableHead>
            <TableHead className="text-gray-700 w-20">Gender</TableHead>
            <TableHead className="text-gray-700 w-28">Email</TableHead>
            <TableHead className="text-gray-700 w-24">Phone</TableHead>
            <TableHead className="text-gray-700 w-32">Address</TableHead>
            <TableHead className="text-gray-700 w-24">Nationality</TableHead>
            <TableHead className="text-gray-700 w-24">ID Type</TableHead>
            <TableHead className="text-gray-700 w-24">ID Number</TableHead>
            <TableHead className="text-gray-700 w-28">Quick Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guestDatabase.map((guest) => (
            <TableRow key={guest.id} className="hover:bg-gray-100 ite">
              <TableCell className="font-medium">{guest.id}</TableCell>
              <TableCell>
                {guest.firstName} {guest.lastName}
              </TableCell>
              <TableCell>{guest.gender}</TableCell>
              <TableCell>{guest.email}</TableCell>
              <TableCell>{guest.phone}</TableCell>
              <TableCell>{guest.address}</TableCell>
              <TableCell>{guest.nationality}</TableCell>
              <TableCell>{guest.idType}</TableCell>
              <TableCell>{guest.idNumber}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-400"
                    onClick={() => handleEdit(guest.id)}
                  >
                    <Edit className="text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-400"
                    onClick={() => handleDelete(guest.id)}
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

export default GuestList;
