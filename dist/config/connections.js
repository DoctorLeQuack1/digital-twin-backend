import mongoose from 'mongoose';
// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/local_digital_twin');
// Export connection
export default mongoose.connection;
