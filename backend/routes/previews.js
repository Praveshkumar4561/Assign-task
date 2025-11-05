const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const previewsFile = path.join(__dirname, "..", "previews.json");

function readPreviews() {
  if (!fs.existsSync(previewsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(previewsFile));
  } catch (e) {
    return [];
  }
}
function writePreviews(data) {
  fs.writeFileSync(previewsFile, JSON.stringify(data, null, 2));
}

router.post("/", (req, res) => {
  const { userImageUrl, hairstyleId, transform, finalImageUrl } = req.body;
  const previews = readPreviews();
  const newPreview = {
    id: Date.now().toString(),
    userImageUrl,
    hairstyleId,
    transform: transform || {},
    finalImageUrl: finalImageUrl || null,
    createdAt: new Date(),
  };
  previews.unshift(newPreview);
  writePreviews(previews);
  res.json({ success: true, preview: newPreview });
});

router.get("/", (req, res) => {
  res.json(readPreviews());
});

module.exports = router;
