// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://192.168.0.199:5173', // allow only your frontend during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true, useUnifiedTopology: true
   })
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch((err) => console.error("DB Connection Error:", err));

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });



// Routes
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const districtRoutes = require("./routes/districtRoutes");
const userRoutes = require("./routes/userRoutes");

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express API on Vercel!' });
});




app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/users", userRoutes);