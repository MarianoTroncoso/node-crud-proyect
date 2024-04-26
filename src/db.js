import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://petotronco:${process.env.MONGODB_DATABASE_PASSWORD}@clusterfornodeproject.sadffvz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForNodeProject`
    );
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database');
    console.error(error);
  }
};
