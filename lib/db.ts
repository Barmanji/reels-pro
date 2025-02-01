import mongoose from "mongoose";
// this all bullshittery has to be done on DB because of EDGE on NEXT
const MONGO_DB_URI = process.env.MONGO_DB_URI!; // ! sign for making sure that mongo URI is getting to us wrna on line 22 it will give us error becuase it can return undefined as well

if(!MONGO_DB_URI){
    throw new Error("Please define MONGO DB URI")
}

let cached = global.mongoose; // global is a empty object kinda like this, mongoose doesnt exist right now thats why TS throws error, so we have to make a new app and tell it that mongoose will exist, TS 101

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};  //this is TS and its wierd
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: true, // What does bufferCommands do?
            maxPoolSize: 10
        }
        cached.promise = mongoose.connect(MONGO_DB_URI, opts)
            .then(()=>mongoose.connection)
            .catch()
    }

    try{
        cached.conn = await cached.promise
    }catch(err){
        cached.promise = null
        throw err;
    }

    return cached.conn;
}
