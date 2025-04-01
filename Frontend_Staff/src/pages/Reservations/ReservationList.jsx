import { CustomTable } from "@/components/Table/Table";
import { reservationDatabase } from "@/TestData/reservationDatabase";
import { reservationColumns } from "@/components/Reservations/ReservationsColumn";
import UserProfileAndBooking from "../Process/GuestCreation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
const ReservationListPage = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  return (
    <div>
      <CustomTable
        data={reservationDatabase}
        columns={reservationColumns}
        defaultSort={[{ id: "created_at", desc: false }]}
        addButtonText="Add Reservation"
        onAddClick={() => setIsAddBookOpen(true)}
      />
      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent className="">
          <UserProfileAndBooking onSuccess={() => setIsAddBookOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationListPage;
