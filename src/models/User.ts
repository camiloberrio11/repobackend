import { Schema, model } from 'mongoose';
import Rol from './Rol';

const UserSchema = new Schema({
  Nameuser: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  Password: {
    type: String,
  },
  Photo: {
    type: String,
  },
  Email: {
    type: String,
  },
  Role: [
    {
      type: Schema.Types.ObjectId,
      ref: Rol,
    },
  ],
});

export default model('User', UserSchema);
