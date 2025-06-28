const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// Get all countries
router.get("/countries", async (req, res) => {
  const countries = await Location.distinct("country");
  res.json(countries);
});

// Get states by country
router.get("/states/:country", async (req, res) => {
  const states = await Location.find({ country: req.params.country }).distinct(
    "state"
  );
  res.json(states);
});

// Get cities by state
router.get("/cities/:state", async (req, res) => {
  const cities = await Location.find({ state: req.params.state }).distinct(
    "city"
  );
  res.json(cities);
});

module.exports = router;
