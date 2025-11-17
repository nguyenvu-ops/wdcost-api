import { getSettings } from "../utils/sheets.js";

export default async function handler(req, res) {
  const data = await getSettings();
  res.json(data);
}
