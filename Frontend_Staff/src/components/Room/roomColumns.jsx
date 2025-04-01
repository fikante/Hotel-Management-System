import { Button } from "@/components/ui/button";
import RoomDetail from "@/pages/Room/RoomDetail";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const roomColumns = [
  {
    id: "roomNumber",
    accessorKey: "roomNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center"
      >
        Room No.
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },
  {
    id: "roomType",
    accessorKey: "roomType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },

  {
    id: "roomDetails",
    header: "Room Details",
    cell: ({ row }) => <RoomDetail row={row} />,
    size: 300,
    enableSorting: false,
  },
  {
    id: "bedType",
    accessorKey: "bedType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bed Type
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 90,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.status}</span>,
    size: 100,
  },
  {
    id: "price",
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.price}$</span>,
    size: 100,
  },
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={useEditRoom(row.original.roomNumber)}
          className=" hover:bg-gray-200"
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => alert(`Delete: ${row.original.roomNumber}`)}
          className=" hover:bg-gray-200"
        >
          <Trash2 className="size-4 text-red-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
];

export const useEditRoom = (roomNo) => {
  const navigate = useNavigate();
  const handleEditGuest = () => {
    navigate(`/rooms/edit-room/${roomNo}`);
  };
  return handleEditGuest;
};
