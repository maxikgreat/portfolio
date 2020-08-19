import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  location: { type: String, required: true },
  jobPosition: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export default model('Work', schema);

