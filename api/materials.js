import { getSheetData } from "../utils/sheets.js";

export default async function handler(req, res) {
  const { type, brand } = req.query;
  const materials = await getSheetData("MATERIALS");
  let result = materials;
  if (type) result = result.filter(item => item.TYPE?.toLowerCase() === type.toLowerCase());
  if (brand) result = result.filter(item => item.BRAND?.toLowerCase() === brand.toLowerCase());
  res.status(200).json(result);
}