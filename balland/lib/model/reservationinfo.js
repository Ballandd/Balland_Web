import mongoose from 'mongoose';
const {Schema} = mongoose;
const reservationinfoSchema = new Schema({
    name :{
        type : String
    },
    contact :{
        type : String
    },
    email :{
        type : String
    },
    studentId : {
        type: String
    },
    userCnt : {
        type : Number
    },
    purpose : {
        type: String
    },
    eventContent : {
        type: String
    },
    etc : {
        type: String
    },
    reservationCreateDate : {
        type: Date
    },
    reservationDate : {
        type: Date
    },
    reservationModifyDate : {
        type: Date
    },
    userId : {
        type: String
    },
    time : {
        type : Number
    }
});

export default mongoose.models.reservationinfo || mongoose.model('reservationinfo', reservationinfoSchema,"reservationinfo");
