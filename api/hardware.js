import { getSheetData } from "../utils/sheets.js";

export default async function handler(req, res) {
  const { category } = req.query;
  const items = await getSheetData("HARDWARE");
  let result = items;
  if (category) result = result.filter(i => i.CATEGORY?.toLowerCase() === category.toLowerCase());
  res.status(200).json(result);
}