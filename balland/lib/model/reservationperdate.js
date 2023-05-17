import mongoose from 'mongoose';
const {Schema} = mongoose;
const reservationperdateSchema = new Schema({
    8:{
        type : Boolean
    },
    10:{
        type : Boolean
    },
    12:{
        type : Boolean
    },
    14:{
        type : Boolean
    },
    16:{
        type : Boolean
    },
    18:{
        type : Boolean
    },
    date:{
        type : Date
    }

});

export default mongoose.models.reservationperdate || mongoose.model('reservationperdate', reservationperdateSchema,"reservationperdate");
