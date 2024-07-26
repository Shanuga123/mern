import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../components/hotelListCard";
import { setHotelsList } from "../redux/state";

export const MyHotels = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddNewHotel = () => {
    navigate("/add-new-hotel");
  };
  const user = useSelector((state) => state.user)
  const hotelsList = user?.hotelsList;
  console.log(user)

  const dispatch = useDispatch()
  const getHotelsList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user._id}/myhotels`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setHotelsList(data))
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getHotelsList()
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 flex flex-col">
          <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-10">Your Hotels</h2>
          <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600" onClick={handleAddNewHotel}>
            Add New Hotel +
          </button>
          </div>
          <div>
        {hotelsList?.map(
          ({
            _id,
            creator,
            type,
            hotelPhotoPaths,
            streetAddress,
            city,
            province,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            title,
            highlight,
            price,
           
          }) => (
            <PropertyCard 
              listingId={_id}
              title={title}
              type={type}
              creator={creator}
              streetAddress={streetAddress}
              hotelPhotoPaths={hotelPhotoPaths}
              city={city}
              province={province}
              guestCount={guestCount}
              bedroomCount={bedroomCount}
              bedCount={bedCount}
              bathroomCount={bathroomCount}
              price={price}
              highlight={highlight}
            />
          )
        )}
      
          </div>
        </main>
      </div>
    </div>
  );
};


