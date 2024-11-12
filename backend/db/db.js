const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://johnte:Mylife2020@cluster0.bntbhii.mongodb.net/', {  // replace with your connection string if using Atlas
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected:', conn.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit the process with failure
  }
};

module.exports = connectDB;
