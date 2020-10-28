const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Bag = require("../../models/Bag");
const User = require("../../models/User");

// @route   GET api/bag
// @desc    get user bag
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const bag = await Bag.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!bag) {
      return res.status(400).json({ msg: "There is no bag for this user" });
    }

    res.json(bag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET  api/bag
// @desc    GET all bags
// @access  Public
router.get("/", async (req, res) => {
  try {
    const bags = await Bag.find().populate("user", ["name", "avatar"]);
    res.json(bags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET  api/bag/user/:user_id
// @desc    GET profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const bag = await Bag.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!bag) return res.status(400).json({ msg: "Bag not found" });

    res.json(bag);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Bag not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/bag
// @desc    Create bag
// @access  Private

router.post(
  "/",
  [auth, [check("discname", "Discname is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      discname,
      discmanufacturer,
      disctype,
      discspeed,
      discglide,
      discturn,
      discfade,
    } = req.body;

    const initialDiscCreation = {};
    // initialDiscCreation.user = req.user.id;  
    if (discname) initialDiscCreation.discname = discname;
    if (discmanufacturer) initialDiscCreation.discmanufacturer = discmanufacturer;
    if (disctype) initialDiscCreation.disctype = disctype;
    if (discspeed) initialDiscCreation.discspeed = discspeed;
    if (discglide) initialDiscCreation.discglide = discglide;
    if (discturn) initialDiscCreation.discturn = discturn;
    if (discfade) initialDiscCreation.discfade = discfade;
    
    const firstDisc = {
      user: req.user.id,
      disccollection: initialDiscCreation
    }
    const newDisc = {
      discname,
      discmanufacturer,
      disctype,
      discspeed,
      discglide,
      discturn,
      discfade,
    };
    try {
      let bag = await Bag.findOne({ user: req.user.id });

      // Add to existing
      if (bag) {
        bag.disccollection.unshift(newDisc);
        await bag.save();
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
  }
);


// @route   Post api/profile
// @desc    Create or update a user profile
// @access  Private
router.post("/profile", auth, async (req, res) => {
  const { favoritedisc, favoritebrand, nickname, homecourse, status } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (favoritedisc) profileFields.favoritedisc = favoritedisc;
  if (favoritebrand) profileFields.favoritebrand = favoritebrand;
  if (nickname) profileFields.nickname = nickname;
  if (homecourse) profileFields.homecourse = homecourse;
  if (status) profileFields.status = status;

  try {
    let bag = await Bag.findOne({ user: req.user.id });

    if (bag) {
      // Update
      bag = await Bag.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(bag);
    }

    // Create
    bag = new Bag(profileFields);

    await bag.save();
    res.json(bag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET  api/profile
// @desc    GET all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   DELETE  api/:disc_id
// @desc    DELETE Profile disc
// @access  Private
router.delete("/:disc_id", auth, async (req, res) => {
  try {
    const bag = await Bag.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = bag.disccollection
      .map((item) => item.id)
      .indexOf(req.params.disc_id);

    bag.disccollection.splice(removeIndex, 1);
    await bag.save();
    res.json(bag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Put  api/:disc_id
// @desc    Add discs to collection
// @access  Private
router.put(
  "/:id",
  [auth, [check("discname", "Disc name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      discname,
      discmanufacturer,
      disctype,
      discspeed,
      discglide,
      discturn,
      discfade,
    } = req.body;

    // build profile object
    const updateDiscFields = {};
    if (discname) updateDiscFields.discname = discname;
    if (discmanufacturer) updateDiscFields.discmanufacturer = discmanufacturer;
    if (disctype) updateDiscFields.disctype = disctype;
    if (discspeed) updateDiscFields.discspeed = discspeed;
    if (discglide) updateDiscFields.discglide = discglide;
    if (discturn) updateDiscFields.discturn = discturn;
    if (discfade) updateDiscFields.discfade = discfade;

    try {
      const query = { "disccollection._id" : req.params.id };
      const updateDocument = {
        $set: {
          "disccollection.$.discname": discname,
          "disccollection.$.discmanufacturer": discmanufacturer,
          "disccollection.$.disctype": disctype,
          "disccollection.$.discspeed": discspeed,
          "disccollection.$.discglide": discglide,
          "disccollection.$.discturn": discturn,
          "disccollection.$.discfade": discfade,
        },
      };
   
      let bag = await Bag.findOneAndUpdate(query, updateDocument, {new: true})

      res.json(bag);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE  api/bag
// @desc    Delete bag, user
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users shared bags?

    // Remove prfile
    await Bag.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
