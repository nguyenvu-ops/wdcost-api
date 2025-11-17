import { getSheetData } from "../utils/sheets.js";

export default async function handler(req, res) {
  const data = await getSheetData("LABOR");
  res.status(200).json(data);
}