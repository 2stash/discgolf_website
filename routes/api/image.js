const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const upload = require("../services/image-upload");
const Bag = require("../../models/Bag");

const singleUpload = upload.single("image");

router.post("/", auth, (req, res) => {
 
  singleUpload(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Image Upload Error", detail: err.message });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

// @route   POST api/bag
// @desc    Test route
// @access  Private

router.post("/upload", auth, async (req, res) => {
  const { imageUrl} = req.body;

  const firstDisc = {
    user: req.user.id,
    imageURL: imageUrl,
  };
 
  try {
    let bag = await Bag.findOne({ user: req.user.id });

    // Add to existing
    if (bag) {
       bag = await Bag.findOneAndUpdate(
        {user: req.user.id},
        {$set: {imageURL: imageUrl}},
        {new: true}        
        );
      return res.json(bag);
    }

    // Create new
    bag = new Bag(firstDisc);
    await bag.save();
    res.json(bag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
