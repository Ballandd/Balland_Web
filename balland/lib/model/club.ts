import mongoose, { Document, Schema } from 'mongoose';

interface IClub extends Document {
  name: string;
  imageBack: string;
  imageAmbler: string;
  imageteam: string;
  info: string;
  color: string;
  captain: string;
  people: string;
  phonenumber: string;
  history: string[];
}

const clubSchema: Schema<IClub> = new Schema<IClub>({
  name: {
    type: String,
  },
  imageBack: {
    type: String,
  },
  imageAmbler: {
    type: String,
  },
  imageteam: {
    type: String,
  },
  info: {
    type: String,
  },
  color: {
    type: String,
  },
  captain: {
    type: String,
  },
  people: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  history: {
    type: [String],
  },
});

export default mongoose.models.club || mongoose.model<IClub>('club', clubSchema, 'club');