import mongoose from 'mongoose';
const {Schema} = mongoose;
const gameInfoSchema = new Schema({
    team1:{
        type : String
    },
    team2:{
        type : String
    },
    phase:{
        type : String
    },
    competitionId:{
        type : String
    },
    status:{
        type : Boolean
    },
    team1_score:{
        type : Number
    },
    team2_score:{
        type : Number
    },
    facility:{
        type : String
    },
    gameDate:{
        type : Date
    },
    team1_penalty :{
        type : Number
    },
    team2_penalty :{
        type : Number
    },
    time:{
        type : String
    },
    logCreateDate:{
        type : Date
    },
    logModifyDate:{
        type : Date
    },

});

export default mongoose.models.gameInfo || mongoose.model('gameInfo', gameInfoSchema,"gameInfo");
