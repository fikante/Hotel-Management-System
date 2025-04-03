import React, { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { roomColumns } from "@/components/Room/roomColumns";
import { roomDatabase } from "@/TestData/roomDataTest.js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";

const RoomList = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <div>
      <CustomTable
        data={roomDatabase}
        columns={roomColumns}
        addButtonText="Add Room"
        maxWidth="48"
        onAddClick={() => setIsAddRoomOpen(true)}
        meta={{
          onEditClick: (room) => {
            setIsEditRoomOpen(true);
            setSelectedRoom(room);
            console.log(room);
          },
        }}
        pageSize={5}
      />
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent>
          <AddRoom onSuccess={() => setIsAddRoomOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
        <DialogContent>
          <EditRoom
            onSuccess={() => setIsEditRoomOpen(false)}
            roomData={selectedRoom}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomList;
