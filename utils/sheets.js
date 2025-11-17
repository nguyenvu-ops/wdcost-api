import { getCache, setCache } from "./cache.js";

const SHEET_ID = process.env.SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

async function fetchSheet(sheetName) {
  const cacheKey = `sheet-${sheetName}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.values) return [];

  const rows = data.values;
  const header = rows[0];

  const parsed = rows.slice(1).map(row => {
    let item = {};
    header.forEach((h, i) => {
      let val = row[i] || "";

      if (h === "PRICE") val = Number(val || 0);
      if (h === "LOSS" && val.includes("%")) val = Number(val.replace("%", "")) / 100;

      item[h] = val;
    });
    return item;
  });

  setCache(cacheKey, parsed);
  return parsed;
}

export async function getMaterials() {
  return await fetchSheet("MATERIALS");
}

export async function getHardware() {
  return await fetchSheet("HARDWARE");
}

export async function getLabor() {
  return await fetchSheet("LABOR");
}

export async function getSettings() {
  const data = await fetchSheet("SETTINGS");
  let settings = {};
  data.forEach(row => {
    settings[row.KEY] = row.VALUE;
  });
  return settings;
}
