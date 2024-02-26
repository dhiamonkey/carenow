import { Request, Response } from "express";
import { getAllData, insertFormData } from "../models/model";

async function getData(req: Request, res: Response): Promise<void> {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving data" });
  }
}

async function postFormData(req: Request, res: Response): Promise<void> {
  try {
    const data = await insertFormData(req.body.data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving data" });
  }
}

export { getData, postFormData };
