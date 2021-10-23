import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
  Name: {
    type: String,
    required: true,
    uppercase: true
  },
});



export default model('Rol', RolSchema);