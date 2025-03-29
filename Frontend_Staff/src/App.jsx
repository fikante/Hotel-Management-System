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
import Services from "./pages/Services/Services";
import Setting from "./pages/Setting/Setting";
import EditProfile from "./pages/Profile/profileEdit";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBooking from "./pages/Reservations/AddBooking";
import AddGuest from "./pages/Guests/AddGuest";
import EditBooking from "./pages/Reservations/EditBooking";
import EditGuest from "./pages/Guests/EditGuest";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Login />} />
        <Route path="/reservations/add-booking" element={<AddBooking />} />
        <Route path="/guests/add-guests" element={<AddGuest />} />
        <Route
          path="/reservations/edit-booking/:id"
          element={<EditBooking />}
        />
        <Route path="/guests/edit-guests/:id" element={<EditGuest />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guests" element={<GuestList />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/restaurant" element={<Food />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Setting />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
