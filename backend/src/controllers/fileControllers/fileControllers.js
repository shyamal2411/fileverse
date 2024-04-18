import express from "express";
import multer from "multer";
import { s3Uploadv2 } from "../../services/s3Service.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../index.js";
import { Document } from "../../models/Docs.js";
import { User } from "../../models/User.js";
import { publishToSns, subscribeToSns } from "../../services/snsService.js";

const storage = multer.memoryStorage();

const app = express();

export const uploadFiles = async (req, res) => {
  console.log(req.body);
  try {
    const connection = AppDataSource;
    const documentRepository = connection.getRepository(Document);
    const userRepository = connection.getRepository(User);
    const files = req.files;

    const token = req.header("Authorization").split(" ")[1];
    // const topicArn = process.env.SNS_TOPIC_ARN;

    const userId = jwt.verify(token, "secretKey").user.id;

    const user = await userRepository.findOneBy({ id: userId });
    const userEmail = user.email;

    const result = await s3Uploadv2(files, userId, userEmail);

    for (const file of result) {
      await documentRepository.save({
        url: file,
        userId: userId,
      });
    }

    // use SnsService to publish to SNS
    // const message = "file uploaded";
    const email = userEmail;
    // const responseSubs = await subscribeToSns(topicArn, email);
    // const response = await publishToSns(message, topicArn, email);
    res.json({ status: "File uploaded successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
  next();
  res.status(400).json({ error: error.message });
});
