import { getHardware } from "../utils/sheets.js";

export default async function handler(req, res) {
  let data = await getHardware();

  const { brand, category } = req.query;

  if (brand) data = data.filter(x => x.BRAND === brand);
  if (category) data = data.filter(x => x.CATEGORY === category);

  res.json(data);
}
