import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
  listingId,
  hotelPhotoPaths = [],
  highlight = "",
  streetAddress = "",
  type = "",
  city = "",
  province = "",
  title = "",
  price = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + hotelPhotoPaths.length) % hotelPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotelPhotoPaths.length);
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/properties/${listingId}`);
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete hotel:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center p-2 border-b border-gray-200">
      <div className="flex-none w-1/6 relative">
        <div className="overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {hotelPhotoPaths.map((photo, index) => (
              <div key={index} className="relative flex-none w-full h-50 flex items-center">
                <img
                  src={`http://localhost:8000/${photo?.replace("public", "")}`}
                  alt={`photo ${index + 1}`}
                  className="w-full h-full filter brightness-85"
                />
                <div
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 pt-1 pb-2 pr-3 pl-3 rounded-full bg-white bg-opacity-70 cursor-pointer hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevSlide(e);
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                </div>
                <div
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 pt-1 pb-2 pr-3 pl-3 rounded-full bg-white bg-opacity-70 cursor-pointer hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide(e);
                  }}
                >
                  <ArrowForwardIos sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-auto w-2/4 p-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <h3 className="text-lg font-bold">{type}</h3>
        <h4>{highlight}</h4>
        <h3 className="text-lg font-semibold">{city}, {province}, {streetAddress}</h3>
        <h3 className="font-semibold"><span>Rs.</span>{price}</h3>
      </div>
      <div className="flex-none p-2">
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => navigate(`/hotel-detail/${listingId}`)}
        >
          View
        </button>
      </div>
      <div className="flex-none p-2">
        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={() => navigate(`/update-hotel/${listingId}`)}
        >
          Edit
        </button>
      </div>
      <div className="flex-none p-2">
        <button
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
