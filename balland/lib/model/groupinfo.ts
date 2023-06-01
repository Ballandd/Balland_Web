import mongoose, { Document, Schema } from 'mongoose';

interface IGroupInfo extends Document {
  rank: Record<string, number>;
  competitionId: string;
  name: number;
}

const groupInfoSchema: Schema<IGroupInfo> = new Schema<IGroupInfo>({
  rank: {
    type: Object,
  },
  competitionId: {
    type: String,
  },
  name: {
    type: Number,
  },
});

export default mongoose.models.groupinfo || mongoose.model<IGroupInfo>('groupinfo', groupInfoSchema, 'groupinfo');
