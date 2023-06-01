import mongoose, { Document, Schema } from 'mongoose';

interface IReservationPerDate extends Document {
  '8': boolean;
  '10': boolean;
  '12': boolean;
  '14': boolean;
  '16': boolean;
  '18': boolean;
  date: Date;
}

const reservationperdateSchema: Schema<IReservationPerDate> = new Schema<IReservationPerDate>({
  '8': {
    type: Boolean,
  },
  '10': {
    type: Boolean,
  },
  '12': {
    type: Boolean,
  },
  '14': {
    type: Boolean,
  },
  '16': {
    type: Boolean,
  },
  '18': {
    type: Boolean,
  },
  date: {
    type: Date,
  },
});

export default mongoose.models.reservationperdate || mongoose.model<IReservationPerDate>('reservationperdate', reservationperdateSchema, 'reservationperdate');
