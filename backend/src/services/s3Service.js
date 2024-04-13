import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const s3Uploadv2 = async (files) => {
  console.log("File: ", files);

  const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });

  console.log("***************S3 Service*****************");

  const params = files.map((file) => {
    return {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `upload_files/${uuidv4().substring(0, 4)}_${file.originalname}`,
      Body: file.buffer,
    };
  });
  const getFileName = params.map((param) => param.Key);
  console.log("File name: ", getFileName);
  try {
    const uploadPromises = params.map((param) =>
      s3.send(new PutObjectCommand(param))
    );
    await Promise.all(uploadPromises);
    return getFileName;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
