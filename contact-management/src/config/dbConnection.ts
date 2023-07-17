import 'dotenv/config'
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongo_connection_string = process.env.CONNECTION_STRING_MONGODB
        if(mongo_connection_string){
            const connect = await mongoose.connect(mongo_connection_string)
            console.log(`Database connected to host ${connect.connection.host} and name ${connect.connection.name}`);
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB