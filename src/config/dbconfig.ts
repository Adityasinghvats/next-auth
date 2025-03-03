import mongoose from "mongoose";

//as next runs on edge , it is not long running 
//for quering db ,we need to make a db call each time we need something
export async function connect(){
    try {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI!, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,  // Force IPv4
            retryWrites: true,
            retryReads: true,
            connectTimeoutMS: 10000,
        });
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })
        connection.on('error', (err) => {
            console.log("MongoDB connection error"+err);
            process.exit(1);
        })
    } catch (error) {
        console.log("Something went wrong while conneting to DB");
        console.log(error);
    }
}