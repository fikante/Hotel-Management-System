import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomColumns } from "@/components/Room/roomColumns";
import { roomDatabase } from "@/TestData/roomDataTest.js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddRoom from "./AddRoom";

const RoomList = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  return (
    <div>
      <CustomTable
        data={roomDatabase}
        columns={roomColumns}
        addButtonText="Add Room"
        maxWidth="56"
        onAddClick={() => setIsAddRoomOpen(true)}
        pageSize={5}
      />
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="">
          <AddRoom onSuccess={() => setIsAddRoomOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomList;
