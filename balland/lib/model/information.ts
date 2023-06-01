import mongoose, { Document, Schema } from 'mongoose';

interface IInformation extends Document {
  title: string;
  content: string;
  writer: string;
  Date: Date;
}

const informationSchema: Schema<IInformation> = new Schema<IInformation>({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  writer: {
    type: String,
  },
  Date: {
    type: Date,
  },
});

export default mongoose.models.information || mongoose.model<IInformation>('information', informationSchema, 'information');
