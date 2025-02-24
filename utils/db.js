const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

// mongoose.connect(URL);

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("connection successful to DB")
    } catch (error) {
        console.log("DB connection fail", error);
        process.exit(0);
    }
}

module.exports = connectDB;