import mongoose from 'mongoose';

export const connect = async () => {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.MONGODB_PASSWORD
  );

  try {
    await mongoose.connect(DB);
    console.log('DB connection successful!');
  } catch (err) {
    console.error('DB connection error:', err);
    throw new Error(err);
  }
};
