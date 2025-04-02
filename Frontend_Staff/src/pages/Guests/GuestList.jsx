import { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";
import { guestDatabase } from "@/TestData/dataTest";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserProfileAndBooking from "../Process/GuestCreation";
import EditGuest from "./EditGuest";

const GuestListPage = () => {
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
   const [isEditGuestOpen, setIsEditEditOpen] = useState(false);
   const [selectedGuest, setSelectedGuest] = useState(null);

  return (
    <div>
      <CustomTable
        data={guestDatabase}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={() => setIsAddGuestOpen(true)}
        meta={{
          onEditClick: (guest) => {
            setSelectedGuest(guest);
            setIsEditEditOpen(true);
            console.log(guest);
          },
        }}
      />

      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent>
          <UserProfileAndBooking onSuccess={() => setIsAddGuestOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditGuestOpen} onOpenChange={setIsEditEditOpen}>
        <DialogContent>
          <EditGuest
            onSuccess={() => {setIsEditEditOpen(false);
              console.log("Guest updated successfully", selectedGuest);
            }}
            guestData={selectedGuest}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestListPage;
