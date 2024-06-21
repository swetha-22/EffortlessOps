const mongoose = require('mongoose');
const connectToDb=()=>{
    mongoose.connect('mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // mongoose.connect('mongodb://127.0.0.1:27017/chat-app?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1')
    console.log("connected to db")
}
module.exports = connectToDb;

