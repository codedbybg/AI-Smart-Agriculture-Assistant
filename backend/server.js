require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
});