import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import DocumentType from './DocumentType';
import Journey from './Journey';
import RequestSubType from './RequestSubType';
import RequestType from './RequestType';
import User from './User';

const RequestSchema = new Schema({
  CodeRequestType: {
    type: Schema.Types.ObjectId,
    ref: RequestType,
    required: true,
  },
  CodeRequestSubtype: {
    type: Schema.Types.ObjectId,
    ref: RequestSubType,
    required: true,
  },
  Consecutive: {
    type: Number,
    required: true,
  },
  Id: {
    type: String,
    required: true,
    unique: true
  },
  AssignedUser: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  Finally: {
    type: Boolean,
    default: false,
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
  EventDate: {
    type: String,
  },
  SideVehicle: {
    type: String,
    maxlength: 3,
  },
  IdVehicle: {
    type: String,
    maxlength: 6,
  },
  Detail: {
    type: String,
    required: true,
  },
  Origin: {
    type: Schema.Types.ObjectId,
    ref: Journey,
  },
  Departure: {
    type: Schema.Types.ObjectId,
    ref: Journey,
  },
  DocumentTypeSender: {
    type: Schema.Types.ObjectId,
    ref: DocumentType,
    required: true,
  },
  IdSender: {
    type: String,
    required: true,
  },
  NameSender: {
    type: String,
    required: true,
    uppercase: true
  },
  AddressSender: {
    type: String,
    required: true,
    uppercase: true
  },
  EmailSender: {
    type: String,
    required: true,
    lowercase: true
  },
  PhoneSender: {
    type: String,
    required: true,
  },
});

RequestSchema.plugin(mongoosePaginate);

export default model('Request', RequestSchema);
