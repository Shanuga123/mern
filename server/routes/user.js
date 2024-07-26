const router = require("express").Router()

const User = require("../models/User")
const Hotel = require("../models/Hotel")


router.get("/:userId/myhotels", async (req, res) => {
    try {
      const { userId } = req.params
      const properties = await Hotel.find({ creator: userId }).populate("creator")
      res.status(202).json(properties)
    } catch (err) {
      console.log(err)
      res.status(404).json({ message: "Can not find properties!", error: err.message })
    }
  })

module.exports = router
