import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import staffColumns from "@/components/Staff/staffCoulmns";
import { staffDatabase } from "@/TestData/staffDatabase";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import AddStaff from "./AddStaff";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditStaff from "./EditStaff";
import AssignStaff from "./AssignStaff";

const StaffList = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center gap-4">
      <CustomTable
        data={staffDatabase}
        columns={staffColumns}
        meta={{
          onEditClick: (staff) => {
            setSelectedStaff(staff);
            setIsEditStaffOpen(true);
            console.log(staff);
          },
        }}
        addButtonText="Add Staff"
        onAddClick={() => setIsAddStaffOpen(true)}
        pageSize={8}
        EnableSelection={true}
        onSelectionChange={setSelectedStaff}
      />

      {selectedStaff && (
        <div className="flex justify-center items-center -mt-4">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => {
              setIsAssignStaffOpen(true);
            }}
          >
            Assign Staff
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
        <DialogContent>
          <AddStaff onSuccess={() => setIsAddStaffOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
        <DialogContent>
          {selectedStaff && (
            <EditStaff
              staffData={selectedStaff}
              onSuccess={() => setIsEditStaffOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAssignStaffOpen} onOpenChange={setIsAssignStaffOpen}>
        <DialogContent className={"sm:max-w-2xl"}>
          {selectedStaff && (
            <AssignStaff
              staff_id={selectedStaff.id}
              onSuccess={() => setIsAssignStaffOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffList;
