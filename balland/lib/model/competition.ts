import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICompetition extends Document {
  title: string;
  condition: number;
  host: string;
  prize: number;
  startdate: Date;
  enddate: Date;
  year: string;
  picture : string;
}

const competitionSchema: Schema<ICompetition> = new Schema<ICompetition>({

  title: {
    type: String,
  },
  condition: {
    type: Number,
  },
  host: {
    type: String,
  },
  prize: {
    type: Number,
  },
  startdate: {
    type: Date,
  },
  enddate: {
    type: Date,
  },
  year: {
    type: String,
  },
  picture: {
    type : String,
  }
});

export default mongoose.models.competition || mongoose.model<ICompetition>('competition', competitionSchema, 'competition');