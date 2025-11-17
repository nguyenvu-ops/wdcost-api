export async function getSheetData(tabName) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const sheetId = process.env.SHEET_ID;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tabName}?key=${apiKey}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.values || json.values.length === 0) return [];
  const rows = json.values;
  const headers = rows[0];
  return rows.slice(1).map(row => {
    let item = {};
    headers.forEach((col, i) => { item[col] = row[i] || ""; });
    return item;
  });
}