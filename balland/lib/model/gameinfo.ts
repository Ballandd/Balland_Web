import mongoose, { Document, Schema } from 'mongoose';

interface IGameInfo extends Document {
  team1: string;
  team2: string;
  phase: string;
  competitionId: string;
  status: boolean;
  team1_score: number;
  team2_score: number;
  facility: string;
  gameDate: Date;
  team1_penalty: number;
  team2_penalty: number;
  time: string;
  logCreateDate: Date;
  logModifyDate: Date;
}

const gameInfoSchema: Schema<IGameInfo> = new Schema<IGameInfo>({
  team1: {
    type: String,
  },
  team2: {
    type: String,
  },
  phase: {
    type: String,
  },
  competitionId: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  team1_score: {
    type: Number,
  },
  team2_score: {
    type: Number,
  },
  facility: {
    type: String,
  },
  gameDate: {
    type: Date,
  },
  team1_penalty: {
    type: Number,
  },
  team2_penalty: {
    type: Number,
  },
  time: {
    type: String,
  },
  logCreateDate: {
    type: Date,
  },
  logModifyDate: {
    type: Date,
  },
});

export default mongoose.models.gameInfo || mongoose.model<IGameInfo>('gameInfo', gameInfoSchema, 'gameInfo');