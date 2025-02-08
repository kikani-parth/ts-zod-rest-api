// session.model.ts

import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { UserDocument } from './user.model';

export interface SchemaDocument extends Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema
const sessionSchema = new Schema<SchemaDocument>(
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
const SessionModel: Model<SchemaDocument> = mongoose.model<SchemaDocument>(
  'Session',
  sessionSchema
);

export default SessionModel;
