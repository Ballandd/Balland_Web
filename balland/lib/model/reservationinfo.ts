import mongoose, { Document, Schema } from 'mongoose';

interface IReservationInfo extends Document {
  name: string;
  contact: string;
  email: string;
  studentId: string;
  userCnt: number;
  purpose: string;
  eventContent: string;
  file: string;
  reservationCreateDate: Date;
  reservationDate: Date;
  reservationModifyDate: Date;
  userId: string;
  time: number;
  status : string;
}

const reservationinfoSchema: Schema<IReservationInfo> = new Schema<IReservationInfo>({
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  studentId: {
    type: String,
  },
  userCnt: {
    type: Number,
  },
  purpose: {
    type: String,
  },
  eventContent: {
    type: String,
  },
  file: {
    type: String,
  },
  reservationCreateDate: {
    type: Date,
  },
  reservationDate: {
    type: Date,
  },
  reservationModifyDate: {
    type: Date,
  },
  userId: {
    type: String,
  },
  time: {
    type: Number,
  },
  status : {
    type : String,
  },
});

export default mongoose.models.reservationinfo || mongoose.model<IReservationInfo>('reservationinfo', reservationinfoSchema, 'reservationinfo');
