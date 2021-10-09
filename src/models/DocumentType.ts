import { Schema, model } from 'mongoose';

const DocumentTypeSchema = new Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true
  },
});



export default model('DocumentType', DocumentTypeSchema);