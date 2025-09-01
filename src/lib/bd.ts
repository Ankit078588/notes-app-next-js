import mongoose from "mongoose";


export const connectDB = async function() {
    try {
        if(mongoose.connection.readyState === 1) return;

        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Database connected!');
    } catch(e) {
        console.log('DB connection error: ', e);
        process.exit(1);
    }
}


