import { useState } from "react";
import HotelCard from "./Hotels/hotelCard";
import hotelData from "./Hotels/hotelData";
import HotelPagination from "./Hotels/hotelPagination";
import HotelToolBar from "./Hotels/hotelToolBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddHotel from "./AddHotel";
import EditHotel from "./EditHotel";

export const HotelListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [addHotelOpen, setAddHotelOpen] = useState(false);
  const [editHotelOpen, setEditHotelOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);

  const filteredHotels = hotelData.filter(
    (hotel) =>
      hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(hotelData);

  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg bg-white">
      <div>
        <HotelToolBar
          setSearchTerm={setSearchTerm}
          buttonText="Add Hotel"
          onAddClick={() => setAddHotelOpen(true)}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedHotels.map((hotel) => (
          <HotelCard
            hotel={hotel}
            onEditClick={() => {
              setEditHotelOpen(true);
              setCurrentHotel(hotel);
            }}
          />
        ))}
      </div>

      <HotelPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <Dialog open={addHotelOpen} onOpenChange={setAddHotelOpen}>
        <DialogContent className="sm:max-w-3xl">
          <AddHotel onSuccess={() => setAddHotelOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editHotelOpen} onOpenChange={setEditHotelOpen}>
        <DialogContent className="sm:max-w-3xl">
          <EditHotel
            currentHotel={currentHotel}
            onSuccess={() => setEditHotelOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
