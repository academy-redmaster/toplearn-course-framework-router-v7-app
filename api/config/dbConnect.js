import * as mongoose from 'mongoose';

export const dbConnect = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('🚀 ~ dbConnect ~ success');
   } catch (err) {
      console.log('🚀 ~ dbConnect ~ success' , err);
   }
};
