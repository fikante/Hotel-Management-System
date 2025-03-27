import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import { hotelName, navItems, userProfile } from "./TestData/HotelConfig.js";
import GuestList from "./pages/Guests/GuestList";
import ReservationList from "./pages/Reservations/ReservationList";
import EditProfile from "./pages/Profile/profileEdit";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(navItems[0]);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar
        appName={hotelName}
        navItems={navItems}
        isOpen={sidebarOpen}
        activeNavItem={activeNavItem}
        onNavItemChange={(item) => setActiveNavItem(item)}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col overflow-hidden flex-1">
        <Topbar
          isSidebarOpen={sidebarOpen}
          user={userProfile}
          currentNavItem={activeNavItem.name}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* 
          respective page displayed based on which navItem is open 
          /* {activeNavItem.id === "guests" ? 0 : 1}
          */}
          {activeNavItem.id === "guests" && <GuestList />}
          {activeNavItem.id === "reservations" && <ReservationList />}
          {/* <EditProfile/> */}
        </main>
      </div>
    </div>
  );
};

export default App;
