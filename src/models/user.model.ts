import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

// Define an interface for the user fields
interface IUser {
  email: string;
  name: string;
  password: string;
}

// Extend IUser with Mongoose Document & Methods
export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define Mongoose schema
const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre<UserDocument>('save', async function (next) {
  // 'this' refers to the current user document being saved.
  // We explicitly cast it to UserDocument for type safety in TypeScript

  const user = this as UserDocument;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Define comparePassword method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Create a Mongoose model
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema
);

export default UserModel;
