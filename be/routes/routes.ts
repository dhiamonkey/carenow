import express from "express";
import { getData, postFormData } from "../functions/index";

const router = express.Router();

router.get("/", getData);

router.post("/create", postFormData);

export default router;
