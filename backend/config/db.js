const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Harshika:Harshika123@chatter-box.tzsjfzc.mongodb.net/?retryWrites=true&w=majority");

    console.log('Mongoose connected');
  } catch (error) {
    console.error('Mongoose connection error:', error.message);
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
};

module.exports = connectDB;

