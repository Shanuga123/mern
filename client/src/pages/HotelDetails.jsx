import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const HotelDetails = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getHotelDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("Fetched Hotel Details:", data);
      setListing(data);
      
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getHotelDetails();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4">
          
          
        <div>
          <h1>{listing.title}</h1>
          
        
          
        {listing.hotelPhotoPaths?.map((photo, index) => (
              <div key={index} className="relative flex-none w-full h-50 flex items-center">
                <img
                  src={`http://localhost:8000/${photo?.replace("public", "")}`}
                  alt={`photo ${index + 1}`}
                  className="w-full h-full filter brightness-85"
                />
                </div>))}
        
        <p >{listing.streetAddress}, {listing.city}, {listing.province}</p>
           
        
        <p>{listing.type}</p>
        <p>{listing.price}</p>
        
        
        <p >{listing.description}</p>
        
        
        

        </div>
        </main>
      </div>
    </div>
  );
};


