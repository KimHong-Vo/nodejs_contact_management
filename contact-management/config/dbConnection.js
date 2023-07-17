import 'dotenv/config'
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
        console.log(`Database connected to host ${connect.connection.host} and name ${connect.connection.name}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB