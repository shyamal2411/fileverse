import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const secretManager = new AWS.SecretsManager({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});
const secretValueGet = async (secret_name) => {
  //   const secret_name = "termassignment-b00958501-secretname";

  // const client = new SecretsManagerClient({
  //   region: "us-east-1",
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     sessionToken: process.env.AWS_SESSION_TOKEN,
  //   },
  // });

  // let response;

  // try {
  //   const response = await client.send(
  //     new GetSecretValueCommand({
  //       SecretId: secret_name,
  //       VersionStage: "AWSCURRENT",
  //     })
  //   );
  //   console.log("This is secret manager response", response);

  //   const secret = response.SecretString;
  //   console.log(secret);
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }

  try {
    const secret = await secretManager
      .getSecretValue({ SecretId: secret_name })
      .promise();
    const secretValue = JSON.parse(secret.SecretString);
    console.log("Secret:================== ", secret);
    return secretValue;
  } catch (error) {
    console.log("Secret ERROR: ", error);
  }
};
export default secretValueGet;
