import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import staffColumns from "@/components/Staff/staffCoulmns";
import { staffDatabase } from "@/TestData/staffDatabase";
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
            setIsEditStaffOpen(true);
            setSelectedStaff(staff);
          },
          onAssignClick: (staff) => {
            setIsAssignStaffOpen(true);
            setSelectedStaff(staff);
          },
        }}
        addButtonText="Add Staff"
        onAddClick={() => setIsAddStaffOpen(true)}
        pageSize={8}
      />

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
              onSuccess={() => {
                setIsEditStaffOpen(false);
                setSelectedStaff(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAssignStaffOpen} onOpenChange={setIsAssignStaffOpen}>
        <DialogContent className={"sm:max-w-2xl"}>
          {selectedStaff && (
            <AssignStaff
              staff_id={selectedStaff.id}
              onSuccess={() => {
                setIsAssignStaffOpen(false);
                setSelectedStaff(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffList;
