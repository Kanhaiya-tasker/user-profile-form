require("dotenv").config();
const mongoose = require("mongoose");
const Location = require("./models/Location");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const locations = [
      { country: "India", state: "Maharashtra", city: "Mumbai" },
      { country: "India", state: "Bihar", city: "Patna" },
      { country: "USA", state: "California", city: "Los Angeles" },
      { country: "USA", state: "Texas", city: "Houston" },
    ];

    return Location.insertMany(locations);
  })
  .then(() => {
    console.log("✅ Locations seeded to MongoDB Atlas");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
  });
