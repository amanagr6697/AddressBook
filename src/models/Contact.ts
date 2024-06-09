import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isSpam: { type: Boolean, default: false }
});

export const Contact = model('Contact', contactSchema);