import { Schema, model } from 'mongoose';

const RequestTypeSchema = new Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true
  },
  Code: {
    type: String,
    required: true,
    uppercase: true
  }
});



export default model('RequestType', RequestTypeSchema);