import { getMaterials } from "../utils/sheets.js";

export default async function handler(req, res) {
  let data = await getMaterials();

  const { type, brand, color, group } = req.query;

  if (type) data = data.filter(x => x.TYPE === type);
  if (brand) data = data.filter(x => x.BRAND === brand);
  if (color) data = data.filter(x => x.COLOR === color);

  if (group === "true") {
    let groups = {};
    data.forEach(item => {
      if (!groups[item.TYPE]) groups[item.TYPE] = [];
      groups[item.TYPE].push(item);
    });
    return res.json(groups);
  }

  res.json(data);
}
