import express from "express";
import { getUserData, postAlbum, deleteAlbums } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserData);    // GET /users/1234

router.post("/:id/albums", postAlbum);    // POST /users/1234/albums

router.delete("/:id/albums", deleteAlbums);    // DELETE /users/1234/albums

export default router;