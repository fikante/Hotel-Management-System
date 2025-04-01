import { useState } from "react";
import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";
import { guestDatabase } from "@/TestData/dataTest";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserProfileAndBooking from "../Process/GuestCreation";

const GuestListPage = () => {
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);

  return (
    <div>
      <CustomTable
        data={guestDatabase}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={() => setIsAddGuestOpen(true)}
      />

      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent className="">
          <UserProfileAndBooking onSuccess={() => setIsAddGuestOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestListPage;
