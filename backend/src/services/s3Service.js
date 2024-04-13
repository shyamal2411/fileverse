import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const s3Uploadv2 = async (files) => {
  console.log("File: ", files);
  // console.log(process.env);
  // AWS.config.update({ region: "us-east-1" });
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });
  console.log("@@@@@@@@@@@@@@");
  // console.log(files);
  // const params = {
  //   Bucket: process.env.S3_BUCKET_NAME,
  //   Key: `uploads-files/${uuid().substring(0, 4)}-${file.originalname}`,
  //   Body: file.buffer,
  // };
  const params = files.map((file) => {
    return {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `upload_files/${uuidv4().substring(0, 4)}_${file.originalname}`,
      Body: file.buffer,
    };
  });
  console.log(params);
  try {
    return await Promise.all(params.map((param) => s3.upload(param).promise()));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
