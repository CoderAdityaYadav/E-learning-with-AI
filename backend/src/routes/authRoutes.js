import express from 'express'
import { signUp, login, getProfile } from '../controller/auth.controller.js';
import {protect} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/me", protect, getProfile);

export default router;