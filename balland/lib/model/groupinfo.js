import mongoose from 'mongoose';
const {Schema} = mongoose;
const groupinfoSchema = new Schema({
    rank: {
        type : Object
    },
    competitionId:{
        type : String
    },
    name:{
        type : Number
    }
});

export default mongoose.models.groupinfo || mongoose.model('groupinfo', groupinfoSchema,"groupinfo");
