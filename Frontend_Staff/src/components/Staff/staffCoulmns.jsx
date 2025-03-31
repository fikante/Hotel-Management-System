import { Button } from "@/components/ui/button";
import { Edit, ArrowUpDown } from "lucide-react";
import { DeleteButton } from "../Delete/DeleteButton";

const staffColumns = [
  {
    id: "picture",
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => (
      <img
        src={row.original.picture}
        alt="Staff"
        className="size-10 rounded-full object-cover"
      />
    ),
    size: 60,
    enableSorting: false,
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),

    size: 24,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 28,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "salary",
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => `$${row.original.salary.toLocaleString()}`,
    size: 24,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "employedDate",
    accessorKey: "employedDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employed Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),

    size: 20,
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
    size: 24,
  },
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            // console.log("Yo",row.original);
            table.options.meta?.onEditClick?.(row.original);
          }}
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <DeleteButton
          onDelete={
            () => alert(`Delete guest with ID: ${row.original.id}`)
            // backend team space to implement delete functionality
          }
        />
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
];

export default staffColumns;
