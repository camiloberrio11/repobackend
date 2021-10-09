import { Schema, model } from 'mongoose';

const JourneySchema = new Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true
  },
});



export default model('Journey', JourneySchema);