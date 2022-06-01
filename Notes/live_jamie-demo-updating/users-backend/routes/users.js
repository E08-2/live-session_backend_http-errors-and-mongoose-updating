import express from "express";
import { userGet, userUpdate } from "../controllers/usersController.js";

const router = express.Router()

router.get("/", userGet);

router.post("/:userId", userUpdate);

export default router;