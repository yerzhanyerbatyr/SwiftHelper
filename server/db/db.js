const { config } = require('dotenv');
const mongoose = require('mongoose');

const db = async () =>{
    console.log("started connection");
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connected");
    } catch (err) {
        console.log("Mongodb: ", err);
    }
}

module.exports = {db}; 