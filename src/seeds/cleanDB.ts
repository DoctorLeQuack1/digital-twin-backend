import Users from '../models/User.js';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Users collection
    await Users.deleteMany({});
    console.log('Users collection cleaned.');
    
  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
