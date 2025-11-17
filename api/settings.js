import { getSheetData } from "../utils/sheets.js";

export default async function handler(req, res) {
  const settings = await getSheetData("SETTINGS");
  const result = {};
  settings.forEach(row => { result[row.KEY] = row.VALUE; });
  res.status(200).json(result);
}