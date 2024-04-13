import express from "express";
import { getFiles } from "../controllers/getFilesControllers/getFilesControllers.js";

const router = express.Router();

router.use(express.json());

router.post("/getfiles", getFiles);

export default router;
