import { CustomTable } from "@/components/Table/Table";
import { reservationDatabase } from "@/TestData/reservationDatabase";
import { reservationColumns } from "@/components/Reservations/ReservationsColumn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import SelectGuestAndBooking from "../Process/ReservationCreation";
import EditBooking from "./EditBooking";


const ReservationListPage = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditReservationOpen, setIsEditReservationOpen] = useState(false);

  return (
    <div>
      <CustomTable
        data={reservationDatabase}
        columns={reservationColumns}
        defaultSort={[{ id: "created_at", desc: false }]}
        addButtonText="Add Reservation"
        onAddClick={() => setIsAddBookOpen(true)}
        meta={{
          onEditClick: (reservation) => {
            setSelectedReservation(reservation);
            setIsEditReservationOpen(true);
          },
        }}
      />
      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent>
          <SelectGuestAndBooking onSuccess={() => setIsAddBookOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditReservationOpen} onOpenChange={setIsEditReservationOpen}>
        <DialogContent>
          <EditBooking
            onSuccess={() => setIsEditReservationOpen(false)}
            reservationData={selectedReservation}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationListPage;
