import express from "express";
import secret from "../services/secretService.js";

const router = express.Router();

router.use(express.json());

router.post("/secret", secret);

export default router;
