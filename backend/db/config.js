const mongoose = require('mongoose');
require('dotenv').config(); 

const uri = process.env.MONGO_DB_CONNECTION;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Get the default connection
  const db = mongoose.connection;
  
  // Event listeners to track connection status
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  