// server.js (پیشنهاد)
const dotenv = require('dotenv');
const mongoose = require('mongoose');

console.log("app.js load test...");
const app = require('./app');
console.log("app.js loaded successfully ✅");

//* Load env
dotenv.config();

//* Database connection (use MONGO_URI from env; fallback to local)
(async () => {
  try {
    // Read connection string from env
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms';

    // Optionally log but avoid printing passwords in logs
    console.log("Connecting to MongoDB (host from MONGO_URI)...");

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
})();

const port = +process.env.PORT || 3000;
const productionMode = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
