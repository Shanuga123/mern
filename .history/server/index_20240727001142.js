const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const hotelRoutes = require("./routes/hotel.js")
const userRoutes = require("./routes/user.js")


const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // Adjust the limit as needed

app.use(cors());
app.use(express.json());//
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", hotelRoutes)
app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const PORT = 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "My_Hotel",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
