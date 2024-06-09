import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  contacts: { type: Schema.Types.ObjectId, ref: 'Contact' }
});

export const User = model('User', userSchema);