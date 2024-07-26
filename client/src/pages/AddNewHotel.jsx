import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { types } from "../data";

export const AddNewHotel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [type, setType] = useState("");
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    city: "",
    province: "",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const { listingId } = useParams(); // Get the ID from the URL

  useEffect(() => {
    if (listingId) {
      // Fetch existing data if ID is present
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/properties/${listingId}`);
          const data = await response.json();
          console.log("Fetched hotel data:", data);
          setType(data.type);
          setFormLocation({
            streetAddress: data.streetAddress,
            city: data.city,
            province: data.province,
          });
          setGuestCount(data.guestCount);
          setBedroomCount(data.bedroomCount);
          setBedCount(data.bedCount);
          setBathroomCount(data.bathroomCount);
          // setPhotos(data.hotelPhotoPaths.map((path) => `http://localhost:8000/${path.replace("public", "")}`));
          setFormDescription({
            title: data.title,
            description: data.description,
            highlight: data.highlight,
            highlightDesc: data.highlightDesc,
            price: data.price,
          });
        } catch (err) {
          console.log("Failed to fetch hotel details", err.message);
        }
      };
      fetchData();
    }
  }, [listingId]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      // Append photos to the FormData
      photos.forEach((photo, index) => {
        listingForm.append("hotelPhotos", photo);
      });

      const requestOptions = {
        method: listingId ? 'PUT' : 'POST', // Use PUT for updating if id is present, otherwise POST for creating
        body: listingForm,
      };

      const response = await fetch(
        listingId ? `http://localhost:8000/properties/${listingId}` : 'http://localhost:8000/properties/create',
        requestOptions
      );

      if (response.ok) {
        navigate('/my-hotels');
      } else {
        console.log('Failed to save property', await response.text());
      }
    } catch (err) {
      console.log("Error during form submission", err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 flex flex-col">
          <h2 className="text-3xl font-bold text-blue-700">{listingId ? 'Edit Hotel' : 'Add New Hotel'}</h2>
          <hr className="mb-8 mt-6" />
          <div>
            <form onSubmit={handlePost}>
              <div className="mb-8">
                <h3 className="font-bold mb-4">What type of place will guests have?</h3>
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {types?.map((item, index) => (
                    <div
                      className={`p-4 border rounded cursor-pointer ${type === item.name ? "bg-blue-100" : ""}`}
                      key={index}
                      onClick={() => setType(item.name)}
                    >
                      <h4 className="font-semibold">{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
  
                <h3 className="font-bold mb-4">Where's your place located?</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <p className="font-medium">Street Address</p>
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      placeholder="Street Address"
                      name="streetAddress"
                      value={formLocation.streetAddress}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">Province</p>
                    <input
                      type="text"
                      className="border p-2 rounded w-full mb-10"
                      placeholder="Province"
                      name="province"
                      value={formLocation.province}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">City</p>
                    <input
                      type="text"
                      className="border p-2 rounded w-full mb-10"
                      placeholder="City"
                      name="city"
                      value={formLocation.city}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                  
                  
                </div>
  
                <h3 className="font-bold mb-4">Share some basics about your place</h3>
                <div className="grid grid-cols-4 gap-4 mb-10">
                  <div>
                    <p className="font-medium">Guests</p>
                    <div className="flex items-center">
                      <RemoveCircleOutline
                        onClick={() => {
                          guestCount > 1 && setGuestCount(guestCount - 1);
                        }}
                      />
                      <input
                        type="number"
                        className="text-center w-16"
                        name="guestCount"
                        value={guestCount}
                        readOnly
                      />
                      <AddCircleOutline
                        onClick={() => setGuestCount(guestCount + 1)}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Bedrooms</p>
                    <div className="flex items-center">
                      <RemoveCircleOutline
                        onClick={() => {
                          bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                        }}
                      />
                      <input
                        type="number"
                        className="text-center w-16"
                        name="bedroomCount"
                        value={bedroomCount}
                        readOnly
                      />
                      <AddCircleOutline
                        onClick={() => setBedroomCount(bedroomCount + 1)}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Beds</p>
                    <div className="flex items-center">
                      <RemoveCircleOutline
                        onClick={() => {
                          bedCount > 1 && setBedCount(bedCount - 1);
                        }}
                      />
                      <input
                        type="number"
                        className="text-center w-16"
                        name="bedCount"
                        value={bedCount}
                        readOnly
                      />
                      <AddCircleOutline onClick={() => setBedCount(bedCount + 1)} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Bathrooms</p>
                    <div className="flex items-center">
                      <RemoveCircleOutline
                        onClick={() => {
                          bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                        }}
                      />
                      <input
                        type="number"
                        className="text-center w-16"
                        name="bathroomCount"
                        value={bathroomCount}
                        readOnly
                      />
                      <AddCircleOutline
                        onClick={() => setBathroomCount(bathroomCount + 1)}
                      />
                    </div>
                  </div>
                </div>
  
                <h3 className="font-bold mb-4">Next, let's add some photos of your place</h3>
                <div className="border p-4 rounded mb-10">
                  <input
                    type="file"
                    multiple
                    onChange={handleUploadPhotos}
                    className="w-full text-center"
                  />
                  <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable droppableId="photos" direction="horizontal">
                      {(provided) => (
                        <div
                          className="flex overflow-x-auto mt-4"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {photos?.map((photo, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                              {(provided) => (
                                <div
                                  className="relative mr-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`photo-${index}`}
                                    className="h-40 w-40 object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 text-red-500 bg-white rounded-full p-1"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash size={24} />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
  
                <h3 className="font-bold mb-4">Lastly, describe your place to potential guests</h3>
                <div className="grid grid-cols-1 gap-4 mb-10">
                  <div>
                    <p className="font-medium">Title</p>
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      placeholder="Title"
                      name="title"
                      value={formDescription.title}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">Description</p>
                    <textarea
                      className="border p-2 rounded w-full"
                      placeholder="Description"
                      name="description"
                      value={formDescription.description}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">Highlight</p>
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      placeholder="Highlight"
                      name="highlight"
                      value={formDescription.highlight}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">Highlight Description</p>
                    <textarea
                      className="border p-2 rounded w-full"
                      placeholder="Highlight Description"
                      name="highlightDesc"
                      value={formDescription.highlightDesc}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">Price per night (Rs.)</p>
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      placeholder="Price"
                      name="price"
                      value={formDescription.price}
                      onChange={handleChangeDescription}
                      required
                    />
                  </div>
                </div>
  
                <button
                  type="submit"
                  className="bg-blue-800 text-white py-2 px-4 rounded mt-4"
                >
                  {listingId ? 'Update Hotel' : 'Publish Hotel'}

                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddNewHotel;

