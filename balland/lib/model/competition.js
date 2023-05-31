import mongoose from 'mongoose';
const {Schema} = mongoose;
const ObjectId = mongoose.Types.ObjectId
const competitionSchema = new Schema({
    _id:{
        type : String
    },
    titile:{
        type : String
    },
    condition:{
        type : Number
    },
    host:{
        type : String
    },
    prize:{
        type : Number
    },
    startdate:{
        type : Date
    },
    enddate:{
        type : Date
    },
    year:{
        type : String
    },
});

export default mongoose.models.competition || mongoose.model('competition', competitionSchema,"competition");
