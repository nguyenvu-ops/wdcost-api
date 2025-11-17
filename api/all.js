import { getSheetData } from "../utils/sheets.js";
import { getCache, setCache } from "../utils/cache.js";

export default async function handler(req, res) {
  try {
    const cached = getCache("all");
    if (cached) return res.status(200).json(cached);

    const [materials, hardware, labor, settings] = await Promise.all([
      getSheetData("MATERIALS"),
      getSheetData("HARDWARE"),
      getSheetData("LABOR"),
      getSheetData("SETTINGS")
    ]);

    const payload = { updated: new Date().toISOString(), materials, hardware, labor, settings };
    setCache("all", payload, 600);
    res.status(200).json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}