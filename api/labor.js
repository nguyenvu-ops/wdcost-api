import { getLabor } from "../utils/sheets.js";

export default async function handler(req, res) {
  const data = await getLabor();
  res.json(data);
}
