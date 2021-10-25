import AWS, { AWSError } from 'aws-sdk';
import { CreateBucketRequest } from 'aws-sdk/clients/lightsail';
import {
  CreateBucketOutput,
  Error,
  GetObjectOutput,
  GetObjectRequest,
  ManagedUpload,
  PutObjectRequest,
} from 'aws-sdk/clients/s3';
import fs from 'fs';
import { AttachmentFile } from '../interfaces/Attachment';

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIATD422TCWH4B3SNFK';
const SECRET = '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';
const BUCKET_NAME = 'test-flotaospina-pqrs';

function connectionAwsBucket(): AWS.S3 {
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });
  return s3;
}

function createBucketStorage(): void {
  const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
      LocationConstraint: 'eu-west-1',
    },
  };
  const connection = connectionAwsBucket();
  connection.createBucket(params, (err: AWSError, data: CreateBucketOutput) => {
    if (err) {
      console.warn(err.stack);
      return;
    }
    console.log('Bucket created', data.Location);
  });
}

export async function uploadFile(file: AttachmentFile, idRequest: string): Promise<any> {
  if (!file) {
    return '';
  }
  const connectionS3 = connectionAwsBucket();
  const params: PutObjectRequest = {
    Bucket: BUCKET_NAME,
    ContentType: file?.typefile,
    Key: `${idRequest}/${file?.name}`,
    Body: Buffer.from(file?.datafile, 'base64'),
  };

  return new Promise((resolve, reject) => {
    connectionS3.upload(params, (error: globalThis.Error, data: ManagedUpload.SendData) => {
      if (error) {
        console.log('Error upload image', error.message);
        reject('');
      }
      resolve(data?.Location);
    });
  });
}