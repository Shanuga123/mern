const router = require("express").Router();
const multer = require("multer");

const Hotel = require("../models/Hotel");
const User = require("../models/User")

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("hotelPhotos"), async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      creator,
      type,
      streetAddress,
      city,
      province,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const hotelPhotos = req.files

    if (!hotelPhotos) {
      return res.status(400).send("No file uploaded.")
    }

    const hotelPhotoPaths = hotelPhotos.map((file) => file.path)

    const newHotel = new Hotel({
      creator,
      type,
      streetAddress,
      city,
      province,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      hotelPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    })

    await newHotel.save()

    res.status(200).json(newHotel)
  } catch (err) {
    res.status(409).json({ message: "Fail to create Hotel", error: err.message })
    console.log(err)
  }
});

// GET all hotels
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotels", error: err.message });
    console.error(err);
  }
});

// GET a single hotel by ID
router.get("/:listingId", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.listingId); // Use req.params.listingId
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotel", error: err.message });
    console.error(err);
  }
});


// UPDATE a hotel listing
router.put("/:listingId", upload.array("hotelPhotos"), async (req, res) => {
  try {
    const {
      type,
      streetAddress,
      city,
      province,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const updates = {
      type,
      streetAddress,
      city,
      province,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    };

    if (req.files && req.files.length > 0) {
      const hotelPhotoPaths = req.files.map((file) => file.path);
      updates.hotelPhotoPaths = hotelPhotoPaths;
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.listingId, updates, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: "Failed to update hotel", error: err.message });
    console.error(err);
  }
});

// DELETE a hotel listing
router.delete("/:listingId", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.listingId);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete hotel", error: err.message });
    console.error(err);
  }
});

module.exports = router;