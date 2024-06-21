const mongoose= require('mongoose');
const { Schema } = mongoose;

//Getting current time
let currentDate = new Date();
let timeNow = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

const UserImageSchema = new Schema({
    image:{
        type:String,
    },
    accuracy:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
        default: timeNow,
    },
});
const UserImage=mongoose.model('image',UserImageSchema,"emp-details");
module.exports= UserImage;