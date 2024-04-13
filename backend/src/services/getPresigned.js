import AWS from "aws-sdk";

export const getPresigned = async (result) => {
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
    signatureVersion: "v4",
  });
  console.log("-----------------");

  const getStrings = [];

  for (const file of result) {
    const presignedGETURL = s3.getSignedUrl("getObject", {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.key,
      Expires: 10000000,
    });
    getStrings.push(presignedGETURL);
  }
  console.log(getStrings);
  return getStrings;
};
