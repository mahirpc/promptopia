import mongoose from "mongoose";
import { stringify } from "postcss";

let isConnected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('Mongodb is connected')
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            // db_name:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
            })

        isConnected = true
        console.log('Mongodb is connected')

    }catch(error){
        console.log(error);
    }

}

export default connectToDB;