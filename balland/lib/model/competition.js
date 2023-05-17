import mongoose from 'mongoose';
const {Schema} = mongoose;
const competitionSchema = new Schema({
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
