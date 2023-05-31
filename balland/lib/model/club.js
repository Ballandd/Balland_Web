import mongoose from 'mongoose';
const {Schema} = mongoose;
const clubSchema = new Schema({
    name : {
        type : String
    },
    imageBack : {
        type : String
    },
    imageAmbler : {
        type : String
    },
    imageteam : {
        type : String
    },
    info : {
        type : String
    },
    color : {
        type : String
    },
    captain : {
        type : String
    },
    people : {
        type : String
    },
    phonenumber : {
        type : String
    },
    history : {
        type : Array
    },
});

export default mongoose.models.club || mongoose.model('club', clubSchema,"club");
