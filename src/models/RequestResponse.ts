import { Schema, model } from 'mongoose';

const RequestResponseSchema = new Schema({
  IdRequest: {
    type: Schema.Types.ObjectId,
    ref: Request,
  },
  Response: {
    type: String,
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
