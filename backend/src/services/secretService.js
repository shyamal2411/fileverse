import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";
dotenv.config();

const secretManager = new SecretsManagerClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const secretValueGet = async (secret_name) => {
  try {
    const secret = await secretManager.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
      })
    );
    const secretValue = JSON.parse(secret.SecretString);
    // console.log("Secret:================== ", secret);
    return secretValue;
  } catch (error) {
    console.log("Secret ERROR: ", error);
  }
};
export default secretValueGet;
