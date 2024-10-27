import express from "express"
import { getMessages, sendMesssage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()

router.post("/send/:id", protectRoute, sendMesssage);
router.post("/:id", protectRoute, getMessages);

export default router