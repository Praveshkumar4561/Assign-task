require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const hairstylesRouter = require("./routes/hairstyles");
const uploadsRouter = require("./routes/uploads");
const previewsRouter = require("./routes/previews");

app.use("/api/hairstyles", hairstylesRouter);
app.use("/api/upload", uploadsRouter);
app.use("/api/previews", previewsRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.send("hello backend");
});

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
