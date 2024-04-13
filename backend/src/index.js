import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import uploadRouter from "./routes/uploadFile.js";
import authRouter from "./routes/authentication.js";
import { User } from "./models/User.js";
import { Document } from "./models/Docs.js";
import getFilesRouter from "./routes/getFile.js";
import cors from "cors";
import secretRouter from "./routes/secret.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH,
  entities: [User, Document],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    app.use("/", secretRouter);
    app.use("/api", uploadRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/file", getFilesRouter);

    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to database:", error));
