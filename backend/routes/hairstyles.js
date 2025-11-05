const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const jsonPath = path.join(__dirname, "..", "hairstyles.json");

let hairstyles = [];
if (fs.existsSync(jsonPath)) {
  hairstyles = JSON.parse(fs.readFileSync(jsonPath));
} else {
  hairstyles = [
    {
      id: "h1",
      length: "short",
      name: "Bob Cut",
      image: "/assets/hairstyles/short/bob.png",
    },
    {
      id: "h2",
      length: "medium",
      name: "Shoulder Wave",
      image: "/assets/hairstyles/medium/wave.png",
    },
    {
      id: "h3",
      length: "long",
      name: "Long Straight",
      image: "/assets/hairstyles/long/long_straight.png",
    },
  ];
}

router.get("/", (req, res) => {
  const { length } = req.query;
  if (length) {
    return res.json(hairstyles.filter((h) => h.length === length));
  }
  res.json(hairstyles);
});

module.exports = router;
