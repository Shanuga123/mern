import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from './pages/Dashboard';
import { MyHotels } from './pages/MyHotels';
import { AddNewHotel } from './pages/AddNewHotel';
import { HotelDetails } from "./pages/HotelDetails";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-hotels" element={<MyHotels />} />
        <Route path="/hotel-detail/:listingId" element={<HotelDetails />} />
        <Route path="/add-new-hotel" element={<AddNewHotel />} />
        <Route path="/update-hotel/:listingId" element={<AddNewHotel />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
