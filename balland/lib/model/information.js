import mongoose from 'mongoose';
const {Schema} = mongoose;
const informationSchema = new Schema({
    title: {
        type : String
    },
    content:{
        type : String
    },
    writer:{
        type : String
    },
    Date:{
        type : Date
    }
});

export default mongoose.models.information || mongoose.model('information', informationSchema,"information");
