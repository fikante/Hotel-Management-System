import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GuestList from "./pages/Guests/GuestList";
import ReservationList from "./pages/Reservations/ReservationList";
import Room from "./pages/Room/Room";
import Food from "./pages/Food/Food";
import Staff from "./pages/Staff/Staff";
import Setting from "./pages/Setting/Setting";
import ProfileSettings from "./pages/Profile/profileEdit";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import RoomSelection from "./pages/Room/RoomSelection";
import AddGuest from "./pages/Guests/AddGuest";
import EditBooking from "./pages/Reservations/EditBooking";
import EditGuest from "./pages/Guests/EditGuest";
import AddFood from "./pages/Food/AddFood";
import AddRoom from "./pages/Room/AddRoom";
import RoomList from "./pages/Room/RoomList";
import EditRoom from "./pages/Room/EditRoom";
import UserProfileAndBooking from "./pages/Process/GuestCreation";
import AddStaff from "./pages/Staff/AddStaff";
import EditStaff from "./pages/Staff/EditStaff";
import AssignStaff from "./pages/Staff/AssignStaff";
import SelectGuestAndBooking from "./pages/Process/ReservationCreation";
import ResetPassLink from "./pages/Auth/ResetPassLink";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassLink />} />
        <Route
          path="/reservations/add-booking"
          element={<SelectGuestAndBooking />}
        />
        <Route path="/guests/add-guests" element={<UserProfileAndBooking />} />
        <Route
          path="/reservations/edit-booking/:id"
          element={<EditBooking />}
        />
        <Route path="/guests/edit-guests/:id" element={<EditGuest />} />
        <Route path="/restaurant/add-food" element={<AddFood />} />
        {/* <Route path="/restaurant/edit-food/:id" element={<AddFood />} /> */}
        <Route path="/rooms/add-room" element={<AddRoom />} />
        <Route path="/rooms/edit-room/:id" element={<EditRoom />} />
        <Route path="/process" element={<UserProfileAndBooking />} />
        <Route path="/staff/add-staff" element={<AddStaff />} />

        <Route path="/staff/assign-staff/:id" element={<AssignStaff />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guests" element={<GuestList />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/restaurant" element={<Food />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/setting" element={<Setting />} />
          
          {/* <Route path="/reports" element={<Reports />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
