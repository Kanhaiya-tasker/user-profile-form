const mongoose = require("mongoose");
const Location = require("./models/Location");

mongoose.connect("mongodb://127.0.0.1:27017/userProfileForm");

const locations = [
  { country: "India", state: "Maharashtra", city: "Mumbai" },
  { country: "India", state: "Maharashtra", city: "Pune" },
  { country: "India", state: "Bihar", city: "Patna" },
  { country: "India", state: "Bihar", city: "Gaya" },
  { country: "USA", state: "California", city: "Los Angeles" },
  { country: "USA", state: "California", city: "San Francisco" },
  { country: "USA", state: "Texas", city: "Houston" },
  { country: "USA", state: "Texas", city: "Austin" },
];

Location.insertMany(locations)
  .then(() => {
    console.log("Locations seeded");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
  });
