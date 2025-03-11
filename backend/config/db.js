const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error)
    {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectToDB;
