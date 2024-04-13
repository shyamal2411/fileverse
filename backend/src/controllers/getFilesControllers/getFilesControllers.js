import express from "express";
import { Document } from "../../models/Docs.js";
import { User } from "../../models/User.js";
import { AppDataSource } from "../../index.js";
import jwt from "jsonwebtoken";
import { publishToSns, subscribeToSns } from "../../services/snsService.js";

export const getFiles = async (req, res) => {
  console.log(
    "***************** This is get files *****************",
    req.body
  );
  try {
    const connection = AppDataSource;
    const documentRepository = connection.getRepository(Document);
    const userRepository = connection.getRepository(User);

    const token = req.header("Authorization").split(" ")[1];
    const userId = jwt.verify(token, "secretKey").user.id;
    const topicArn = process.env.SNS_TOPIC_ARN;
    const documents = await documentRepository.findBy({ userId });
    const user = await userRepository.findOneBy({ id: userId });
    // const email = user.email;

    console.log("User id", user.id);
    console.log("User email", user.email);
    const email = user.email;
    const getStrings = [];

    for (const file of documents) {
      const presignedGETURL = `${process.env.CLOUDFRONT_URL}/${file.url}`;
      getStrings.push(presignedGETURL);
    }

    // return getStrings;
    const message = `Files shared, ${getStrings}`;
    // console.log("Below are the URLS", getStrings);

    const responseSubs = await subscribeToSns(topicArn, email);
    const response = await publishToSns(message, topicArn, email);
    res.json({ files: getStrings });
    // getPresigned(documents.map((doc) => doc.url));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
