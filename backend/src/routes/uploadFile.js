import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { uploadFiles } from "../controllers/fileControllers/fileControllers.js";
import multer from "multer";
import { mergeAndUploadPdf } from "../controllers/fileControllers/mergeFilesControllers.js";

dotenv.config();

const app = express();
app.use(express.json());

const router = express.Router();
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (["pdf", "txt", "doc", "docx"].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf, doc, txt supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});
router.post("/upload", upload.array("file"), uploadFiles);
router.post("/merge-files", upload.array("file"), mergeAndUploadPdf);

export default router;
