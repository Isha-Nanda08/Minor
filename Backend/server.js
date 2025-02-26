require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Initialize Express App
const app = express();
const port = process.env.PORT || 5000;

//Connect to MongoDB
connectDB();

//Middleware
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Handle cookies (refresh tokens)
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests

//Routes
app.get("/", (req, res) => {
    res.send(" Server is running and MongoDB is connected!");
});
app.use("/auth", (req, res, next) => {
    // console.log("Auth route middleware called"); // Debug 
    next();
}, require("./routes/authRoutes")); // Authentication routes



//  Global Error Handling (Optional)
app.use((err, req, res, next) => {
    console.error(" Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

//  Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
