import { getMaterials, getHardware, getLabor, getSettings } from "../utils/sheets.js";

export default async function handler(req, res) {
  const [materials, hardware, labor, settings] = await Promise.all([
    getMaterials(),
    getHardware(),
    getLabor(),
    getSettings()
  ]);

  res.json({
    materials,
    hardware,
    labor,
    settings
  });
}
