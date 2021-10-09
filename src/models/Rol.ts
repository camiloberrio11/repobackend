import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true
  },
});



export default model('Rol', RolSchema);