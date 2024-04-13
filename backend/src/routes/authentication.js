import express from "express";
import { signup } from "../controllers/authControllers/signupControllers.js";
import { login } from "../controllers/authControllers/loginControllers.js";
import cors from "cors";

const router = express.Router();
router.use(cors());
router.post("/signup", signup);
router.post("/login", login);

export default router;
