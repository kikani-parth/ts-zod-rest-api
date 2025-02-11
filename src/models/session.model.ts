// session.model.ts

import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema
const sessionSchema = new Schema<SessionDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model
const SessionModel: Model<SessionDocument> = mongoose.model<SessionDocument>(
  'Session',
  sessionSchema
);

export default SessionModel;
