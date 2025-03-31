import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { staffColumns } from "@/components/Staff/staffCoulmns";
import { staffDatabase } from "@/TestData/staffDatabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const StaffList = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const onAddClick = () => {
    navigate("/staff/assign-staff");
  }

  const navigate = useNavigate();
  const handleAddStaff = () => {
    navigate("/staff/add-staff");
  };
  return (
    <div className="flex flex-col justify-center gap-4 ">
      <CustomTable
        data={staffDatabase}
        columns={staffColumns}
        addButtonText="Add Staff"
        onAddClick={handleAddStaff}
        pageSize={8}
        EnableSelection={true}
        onSelectionChange={setSelectedStaff}
      />
      {selectedStaff && (
        <div className="flex justify-center items-center -mt-10">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={onAddClick}
          >
            Assign Staff
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StaffList;
