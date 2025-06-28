const path = require("path");
const User = require("../models/User");

// ✅ Check Username Availability
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const exists = await User.findOne({ username });
    res.json({ available: !exists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ available: false });
  }
};

// ✅ Submit Profile Form
exports.submitProfile = async (req, res) => {
  try {
    const {
      username,
      currentPassword,
      newPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscription,
      newsletter,
    } = req.body;

    const user = new User({
      username,
      currentPassword,
      newPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscription,
      newsletter: newsletter === "on",
      profilePhoto: req.file ? req.file.filename : "",
    });

    await user.save();
    res.json({ success: true, message: "Profile saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
