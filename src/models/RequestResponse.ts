import { Schema, model } from 'mongoose';
import Request from './Request';

const RequestResponseSchema = new Schema({
  IdRequest: {
    type: Schema.Types.ObjectId,
    ref: Request,
    unique: true
  },
  Answer: {
    type: String,
  },
  AnswerDate: {
    type: String
  },
  AttachmentOne: {
    type: String,
  },
  AttachmentTwo: {
    type: String,
  },
  AttachmentThree: {
    type: String,
  },
});

export default model('RequestResponse', RequestResponseSchema);
