import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "/Users/enriquemorales/Desktop/Experiment/product/etsy-seller-profit-tracker.xlsx";
const previewDir = "/tmp/codex-etsy-profit-tracker/previews";
const workbook = Workbook.create();

const start = workbook.worksheets.add("START HERE");
const settings = workbook.worksheets.add("SETTINGS");
const orders = workbook.worksheets.add("ORDERS");
const dashboard = workbook.worksheets.add("DASHBOARD");
const example = workbook.worksheets.add("EXAMPLE");

const FONT = "Arial";
const NAVY = "#17324D";
const BLUE = "#2C6EAA";
const PALE_BLUE = "#EAF3FA";
const PALE_GOLD = "#FFF3CD";
const PALE_GREEN = "#E8F5EE";
const PALE_RED = "#FCE8E6";
const BORDER = "#CBD5E1";
const TEXT = "#1F2937";
const MUTED = "#64748B";
const MONEY = '$#,##0.00;[Red]($#,##0.00);-';
const PERCENT = '0.0%;[Red](0.0%);-';

function baseSheet(sheet, range) {
  sheet.showGridLines = false;
  const used = sheet.getRange(range);
  used.format.font = { name: FONT, size: 10, color: TEXT };
  used.format.verticalAlignment = "center";
}

function title(sheet, range, text) {
  sheet.getRange(range).values = [[text]];
  sheet.getRange(range).format.font = { name: FONT, size: 16, bold: true, color: NAVY };
}

function header(range) {
  range.format = {
    fill: NAVY,
    font: { name: FONT, size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#FFFFFF" },
  };
}

function section(range) {
  range.format = {
    fill: PALE_BLUE,
    font: { name: FONT, size: 10, bold: true, color: NAVY },
    borders: { preset: "outside", style: "thin", color: BORDER },
  };
}

function setColumnWidths(sheet, widths) {
  for (const [address, width] of Object.entries(widths)) {
    sheet.getRange(address).format.columnWidth = width;
  }
}

// START HERE
baseSheet(start, "A1:H30");
title(start, "A2", "Etsy Seller Profit Tracker (after fees)");
start.getRange("A3:H3").format.borders = { bottom: { style: "thin", color: BLUE } };
start.getRange("A5:H7").merge();
start.getRange("A5").values = [["Important: This workbook is not tax advice. Etsy fees vary by seller country and can change over time. Confirm every rate in your Etsy Payment account and update SETTINGS before relying on the results."]];
start.getRange("A5:H7").format = {
  fill: PALE_GOLD,
  font: { name: FONT, size: 11, bold: true, color: "#7C4A03" },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: "#D69E2E" },
};
start.getRange("A9:H9").merge();
start.getRange("A9").values = [["Quick start"]];
section(start.getRange("A9:H9"));
start.getRange("A11:B14").values = [
  ["1", "Open SETTINGS. Verify the US defaults and choose Yes/No for the $10,000 Offsite Ads threshold."],
  ["2", "Enter one order per row in ORDERS. Use the yellow columns only."],
  ["3", "Review calculated fees and net profit on the same row."],
  ["4", "Choose a month on DASHBOARD to review monthly results."],
];
start.getRange("A11:A14").format = { fill: NAVY, font: { name: FONT, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
start.getRange("B11:H14").format.wrapText = true;
start.getRange("A11:H14").format.rowHeight = 31;
start.getRange("A16:H16").merge();
start.getRange("A16").values = [["What this model includes"]];
section(start.getRange("A16:H16"));
start.getRange("A18:D23").values = [
  ["Included", "Listing fee", "Included", "Transaction fee"],
  ["Included", "Payment processing", "Included", "Offsite Ads"],
  ["Included", "Manual Etsy Ads cost", "Included", "Regulatory operating fee"],
  ["Included", "Refunds", "Excluded", "Sales tax collected/remitted by Etsy"],
  ["Excluded", "Shipping labels", "Excluded", "VAT on seller fees"],
  ["Excluded", "Currency conversion and subscriptions", "Excluded", "Income tax and cost of goods"],
];
start.getRange("A18:D23").format.borders = { preset: "inside", style: "thin", color: BORDER };
start.getRange("A18:A23").format.font = { name: FONT, bold: true, color: NAVY };
start.getRange("C18:C23").format.font = { name: FONT, bold: true, color: NAVY };
start.getRange("A25:H27").merge();
start.getRange("A25").values = [["Refund handling in this model: the refund reduces the fee base before percentage fees are calculated; the listing fee and manually entered Etsy Ads spend remain costs. Compare the result with actual credits in your Etsy Payment account."]];
start.getRange("A25:H27").format = { fill: "#F8FAFC", font: { name: FONT, italic: true, color: MUTED }, wrapText: true, borders: { preset: "outside", style: "thin", color: BORDER } };
setColumnWidths(start, { "A:A": 12, "B:B": 28, "C:C": 12, "D:D": 34, "E:H": 12 });
start.getRange("B11:B14").format.columnWidth = 90;
start.tabColor = NAVY;

// SETTINGS
baseSheet(settings, "A1:F20");
title(settings, "A2", "SETTINGS — verify before use");
settings.getRange("A3:F3").values = [["US seller defaults. Yellow cells are editable. Update rates using your Etsy Payment account before use."]];
settings.getRange("A3:F3").merge();
settings.getRange("A3:F3").format = { fill: PALE_GOLD, font: { name: FONT, bold: true, color: "#7C4A03" }, wrapText: true };
settings.getRange("A5:F5").values = [["Assumption", "Value", "Unit / control", "Official source", "Checked", "Notes"]];
header(settings.getRange("A5:F5"));
settings.getRange("A6:F15").values = [
  ["Listing fee per item", 0.20, "USD", "https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy", new Date("2026-10-08T12:00:00Z"), "US seller, verify before use"],
  ["Transaction fee rate", 0.065, "% of net order", "https://help.etsy.com/hc/en-us/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy", new Date("2026-10-08T12:00:00Z"), "Includes item price and shipping"],
  ["Payment processing rate", 0.03, "% of net order", "https://www.etsy.com/sell", new Date("2026-10-08T12:00:00Z"), "US seller, verify before use"],
  ["Payment processing fixed fee", 0.25, "USD per order", "https://www.etsy.com/sell", new Date("2026-10-08T12:00:00Z"), "Applied only when net sales after refund are above zero"],
  ["Offsite Ads standard rate", 0.15, "% of attributed order", "https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-s-Offsite-Ads-Work", new Date("2026-10-08T12:00:00Z"), "For shops below the threshold; verify eligibility to opt out"],
  ["Offsite Ads reduced rate", 0.12, "% of attributed order", "https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-s-Offsite-Ads-Work", new Date("2026-10-08T12:00:00Z"), "For shops that crossed the threshold"],
  ["Shop crossed $10,000 threshold?", "No", "Yes / No", "https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-s-Offsite-Ads-Work", new Date("2026-10-08T12:00:00Z"), "This controls the active Offsite Ads rate"],
  ["Active Offsite Ads rate", null, "Calculated", "Uses the two rates above", new Date("2026-10-08T12:00:00Z"), "Formula; do not overwrite"],
  ["Offsite Ads fee cap", 100, "USD per order", "https://www.etsy.com/legal/fees", new Date("2026-10-08T12:00:00Z"), "Official policy states a $100 maximum per attributed order"],
  ["Regulatory operating fee rate", 0, "% of net order", "https://help.etsy.com/hc/en-us/articles/1500011073202-What-is-a-Regulatory-Operating-Fee", new Date("2026-10-08T12:00:00Z"), "0% US default; edit for your seller country"],
];
settings.getRange("B13").formulas = [["=IF(B12=\"Yes\",B11,B10)"]];
settings.getRange("B6:B15").format.fill = PALE_GOLD;
settings.getRange("B13").format = { fill: PALE_BLUE, font: { name: FONT, bold: true, color: NAVY } };
settings.getRange("B6").format.numberFormat = MONEY;
settings.getRange("B7:B8").format.numberFormat = PERCENT;
settings.getRange("B9").format.numberFormat = MONEY;
settings.getRange("B10:B11").format.numberFormat = PERCENT;
settings.getRange("B13").format.numberFormat = PERCENT;
settings.getRange("B14").format.numberFormat = MONEY;
settings.getRange("B15").format.numberFormat = PERCENT;
settings.getRange("E6:E15").format.numberFormat = "yyyy-mm-dd";
settings.getRange("B12").dataValidation = { rule: { type: "list", values: ["No", "Yes"] } };
settings.getRange("A6:F15").format.borders = { insideHorizontal: { style: "thin", color: BORDER } };
settings.getRange("D6:D15").format.font = { name: FONT, size: 9, color: BLUE };
settings.getRange("F6:F15").format.wrapText = true;
settings.getRange("A17:F19").merge();
settings.getRange("A17").values = [["Not modeled: VAT on seller fees, sales tax collected/remitted by Etsy, shipping labels, currency conversion, subscriptions, payment reserves, chargebacks, income tax, cost of goods, or bank/deposit fees."]];
settings.getRange("A17:F19").format = { fill: "#F8FAFC", font: { name: FONT, italic: true, color: MUTED }, wrapText: true, borders: { preset: "outside", style: "thin", color: BORDER } };
setColumnWidths(settings, { "A:A": 31, "B:B": 17, "C:C": 22, "D:D": 56, "E:E": 14, "F:F": 40 });
settings.getRange("5:5").format.rowHeight = 34;
settings.getRange("6:15").format.rowHeight = 32;
settings.freezePanes.freezeRows(5);
settings.tabColor = BLUE;

const orderHeaders = ["Date", "Listing", "Item price", "Shipping charged", "Quantity", "Offsite Ad?", "Etsy Ads spend", "Refund", "Item subtotal", "Order total", "Net sales after refund", "Listing fee", "Transaction fee", "Payment processing", "Offsite Ads fee", "Regulatory fee", "Total fees", "Net profit", "Margin", "Notes"];
function buildOrderSheet(sheet, isExample = false) {
  const lastRow = isExample ? 13 : 205;
  baseSheet(sheet, `A1:T${lastRow}`);
  title(sheet, "A2", isExample ? "EXAMPLE — eight calculated orders" : "ORDERS — one row per order");
  sheet.getRange("A3:T3").merge();
  sheet.getRange("A3").values = [[isExample ? "Read-only examples using the current SETTINGS. Expected net results are documented in product/CHECKS.md." : "Enter data in yellow columns A:H and optional Notes. Blue columns calculate automatically from SETTINGS."]];
  sheet.getRange("A3:T3").format = { fill: isExample ? PALE_GREEN : PALE_GOLD, font: { name: FONT, bold: true, color: isExample ? "#166534" : "#7C4A03" } };
  sheet.getRange("A5:T5").values = [orderHeaders];
  header(sheet.getRange("A5:T5"));
  if (!isExample) {
    sheet.getRange(`A6:H${lastRow}`).format.fill = PALE_GOLD;
    sheet.getRange(`T6:T${lastRow}`).format.fill = PALE_GOLD;
  }
  sheet.getRange(`I6:S${lastRow}`).format.fill = PALE_BLUE;
  const formulas = [];
  for (let r = 6; r <= lastRow; r += 1) {
    formulas.push([
      `=IF(OR(C${r}=\"\",E${r}=\"\"),\"\",ROUND(C${r}*E${r},2))`,
      `=IF(I${r}=\"\",\"\",ROUND(I${r}+D${r},2))`,
      `=IF(J${r}=\"\",\"\",MAX(ROUND(J${r}-H${r},2),0))`,
      `=IF(A${r}=\"\",\"\",ROUND(E${r}*SETTINGS!$B$6,2))`,
      `=IF(A${r}=\"\",\"\",ROUND(K${r}*SETTINGS!$B$7,2))`,
      `=IF(A${r}=\"\",\"\",IF(K${r}>0,ROUND(K${r}*SETTINGS!$B$8+SETTINGS!$B$9,2),0))`,
      `=IF(A${r}=\"\",\"\",IF(F${r}=\"Yes\",ROUND(MIN(K${r}*SETTINGS!$B$13,SETTINGS!$B$14),2),0))`,
      `=IF(A${r}=\"\",\"\",ROUND(K${r}*SETTINGS!$B$15,2))`,
      `=IF(A${r}=\"\",\"\",ROUND(SUM(L${r}:P${r})+G${r},2))`,
      `=IF(A${r}=\"\",\"\",ROUND(K${r}-Q${r},2))`,
      `=IF(OR(A${r}=\"\",K${r}=0),\"\",R${r}/K${r})`,
    ]);
  }
  sheet.getRange(`I6:S${lastRow}`).formulas = formulas;
  sheet.getRange(`A6:A${lastRow}`).format.numberFormat = "mm/dd/yy";
  sheet.getRange(`C6:D${lastRow}`).format.numberFormat = MONEY;
  sheet.getRange(`G6:R${lastRow}`).format.numberFormat = MONEY;
  sheet.getRange(`S6:S${lastRow}`).format.numberFormat = PERCENT;
  sheet.getRange(`F6:F${lastRow}`).dataValidation = { rule: { type: "list", values: ["No", "Yes"] } };
  sheet.getRange(`R6:R${lastRow}`).conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { fill: PALE_RED, font: { bold: true, color: "#B42318" } } });
  sheet.getRange(`A5:T${lastRow}`).format.borders = { insideHorizontal: { style: "thin", color: "#E2E8F0" } };
  sheet.freezePanes.freezeRows(5);
  sheet.freezePanes.freezeColumns(2);
  setColumnWidths(sheet, { "A:A": 13, "B:B": 26, "C:D": 16, "E:E": 11, "F:F": 14, "G:H": 16, "I:R": 17, "S:S": 12, "T:T": 30 });
  sheet.getRange("5:5").format.rowHeight = 46;
  sheet.getRange(`6:${lastRow}`).format.rowHeight = 23;
  const table = sheet.tables.add(`A5:T${lastRow}`, true, isExample ? "ExampleOrders" : "OrdersTable");
  table.style = "TableStyleMedium2";
  table.showBandedRows = false;
}

buildOrderSheet(orders, false);
orders.tabColor = "#5B8DB8";

buildOrderSheet(example, true);
example.getRange("A6:H13").values = [
  [new Date("2026-09-03T12:00:00Z"), "Ceramic mug", 28, 6, 1, "No", 0, 0],
  [new Date("2026-09-05T12:00:00Z"), "Wedding template", 18, 0, 2, "Yes", 0, 0],
  [new Date("2026-09-08T12:00:00Z"), "Silver necklace", 65, 5, 1, "Yes", 4.5, 0],
  [new Date("2026-09-12T12:00:00Z"), "Printable planner", 12, 0, 1, "No", 3, 0],
  [new Date("2026-09-15T12:00:00Z"), "Candle set", 24, 8, 3, "No", 0, 20],
  [new Date("2026-09-18T12:00:00Z"), "Knit pattern", 7.5, 0, 4, "Yes", 0, 0],
  [new Date("2026-09-21T12:00:00Z"), "Wall art", 45, 0, 1, "No", 2.25, 45],
  [new Date("2026-09-24T12:00:00Z"), "Leather journal", 38, 7, 2, "Yes", 1.5, 10],
];
example.getRange("T6:T13").values = [
  ["Standard order"], ["Two items + Offsite Ad"], ["Offsite Ad + manual Etsy Ads"], ["Manual Etsy Ads cost"],
  ["Partial refund"], ["Four items + Offsite Ad"], ["Full refund; ad spend remains"], ["Shipping, refund, and Offsite Ad"],
];
example.getRange("A6:H13").format.fill = "#F8FAFC";
example.getRange("T6:T13").format.fill = "#F8FAFC";
example.tabColor = "#94A3B8";

// DASHBOARD
baseSheet(dashboard, "A1:H24");
title(dashboard, "A2", "DASHBOARD — monthly profit after fees");
dashboard.getRange("A3:H3").format.borders = { bottom: { style: "thin", color: BLUE } };
dashboard.getRange("A5").values = [["Month"]];
dashboard.getRange("B5").values = [[new Date("2026-10-01T12:00:00Z")]];
dashboard.getRange("B5").format = { fill: PALE_GOLD, font: { name: FONT, bold: true, color: NAVY }, numberFormat: "mmmm yyyy", horizontalAlignment: "center", borders: { preset: "outside", style: "thin", color: "#D69E2E" } };
dashboard.getRange("D5:H5").merge();
dashboard.getRange("D5").values = [["Change the month to the first day of any month. Metrics use ORDERS only."]];
dashboard.getRange("D5:H5").format.font = { name: FONT, italic: true, color: MUTED };
dashboard.getRange("A8:B11").values = [["Net sales", null], ["Total fees", null], ["Net profit", null], ["Margin", null]];
dashboard.getRange("D8:E10").values = [["Orders", null], ["Orders with Offsite Ads", null], ["Offsite share", null]];
dashboard.getRange("B8").formulas = [["=SUMIFS(ORDERS!$K$6:$K$205,ORDERS!$A$6:$A$205,\">=\"&$B$5,ORDERS!$A$6:$A$205,\"<\"&EDATE($B$5,1))"]];
dashboard.getRange("B9").formulas = [["=SUMIFS(ORDERS!$Q$6:$Q$205,ORDERS!$A$6:$A$205,\">=\"&$B$5,ORDERS!$A$6:$A$205,\"<\"&EDATE($B$5,1))"]];
dashboard.getRange("B10").formulas = [["=SUMIFS(ORDERS!$R$6:$R$205,ORDERS!$A$6:$A$205,\">=\"&$B$5,ORDERS!$A$6:$A$205,\"<\"&EDATE($B$5,1))"]];
dashboard.getRange("B11").formulas = [["=IF(B8=0,\"\",B10/B8)"]];
dashboard.getRange("E8").formulas = [["=COUNTIFS(ORDERS!$A$6:$A$205,\">=\"&$B$5,ORDERS!$A$6:$A$205,\"<\"&EDATE($B$5,1))"]];
dashboard.getRange("E9").formulas = [["=COUNTIFS(ORDERS!$A$6:$A$205,\">=\"&$B$5,ORDERS!$A$6:$A$205,\"<\"&EDATE($B$5,1),ORDERS!$F$6:$F$205,\"Yes\")"]];
dashboard.getRange("E10").formulas = [["=IF(E8=0,\"\",E9/E8)"]];
dashboard.getRange("A8:A11").format = { fill: PALE_BLUE, font: { name: FONT, bold: true, color: NAVY }, borders: { preset: "outside", style: "thin", color: BORDER } };
dashboard.getRange("B8:B11").format = { fill: "#FFFFFF", font: { name: FONT, size: 14, bold: true, color: NAVY }, horizontalAlignment: "right", borders: { preset: "outside", style: "thin", color: BORDER } };
dashboard.getRange("D8:D10").format = { fill: PALE_BLUE, font: { name: FONT, bold: true, color: NAVY }, borders: { preset: "outside", style: "thin", color: BORDER } };
dashboard.getRange("E8:E10").format = { fill: "#FFFFFF", font: { name: FONT, size: 14, bold: true, color: NAVY }, horizontalAlignment: "right", borders: { preset: "outside", style: "thin", color: BORDER } };
dashboard.getRange("B8:B10").format.numberFormat = MONEY;
dashboard.getRange("B11").format.numberFormat = PERCENT;
dashboard.getRange("E8:E9").format.numberFormat = "0";
dashboard.getRange("E10").format.numberFormat = PERCENT;
dashboard.getRange("A14:H14").merge();
dashboard.getRange("A14").values = [["Fee assumptions currently in use"]];
section(dashboard.getRange("A14:H14"));
dashboard.getRange("A16:B20").values = [["Listing fee", null], ["Transaction fee", null], ["Payment processing", null], ["Active Offsite Ads rate", null], ["Regulatory fee", null]];
dashboard.getRange("B16:B20").formulas = [["=SETTINGS!B6"], ["=SETTINGS!B7"], ["=SETTINGS!B8"], ["=SETTINGS!B13"], ["=SETTINGS!B15"]];
dashboard.getRange("B16").format.numberFormat = MONEY;
dashboard.getRange("B17:B20").format.numberFormat = PERCENT;
dashboard.getRange("D16:H20").merge();
dashboard.getRange("D16").values = [["Check SETTINGS before use. This tracker is an estimate based on the assumptions you enter; it does not replace your Etsy Payment account or an accountant."]];
dashboard.getRange("D16:H20").format = { fill: PALE_GOLD, font: { name: FONT, bold: true, color: "#7C4A03" }, wrapText: true, borders: { preset: "outside", style: "thin", color: "#D69E2E" } };
setColumnWidths(dashboard, { "A:A": 26, "B:B": 18, "C:C": 4, "D:D": 29, "E:E": 18, "F:H": 14 });
dashboard.tabColor = NAVY;

workbook.recalculate();

// Recalculation proof: toggle the threshold, verify the same formulas update,
// then restore the default before rendering and export.
settings.getRange("B12").values = [["Yes"]];
workbook.recalculate();
const thresholdCheck = await workbook.inspect({
  kind: "table",
  range: "EXAMPLE!O7:R7",
  include: "values,formulas",
  tableMaxRows: 2,
  tableMaxCols: 4,
  maxChars: 3000,
});
const thresholdRecord = JSON.parse(thresholdCheck.ndjson.split("\n").find(Boolean));
const thresholdValues = thresholdRecord.values?.[0] ?? [];
if (Math.abs(thresholdValues[0] - 4.32) > 0.0001 || Math.abs(thresholdValues[3] - 27.61) > 0.0001) {
  throw new Error(`Threshold recalculation failed: ${JSON.stringify(thresholdValues)}`);
}
settings.getRange("B12").values = [["No"]];
workbook.recalculate();

await fs.mkdir(previewDir, { recursive: true });
for (const sheetName of ["START HERE", "SETTINGS", "ORDERS", "DASHBOARD", "EXAMPLE"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  const safeName = sheetName.toLowerCase().replaceAll(" ", "-");
  await fs.writeFile(`${previewDir}/${safeName}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const keyChecks = await workbook.inspect({
  kind: "table",
  range: "EXAMPLE!A5:T13",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 20,
  maxChars: 24000,
});
await fs.writeFile("/tmp/codex-etsy-profit-tracker/example-inspect.ndjson", keyChecks.ndjson, "utf8");
const errorCheck = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
await fs.writeFile("/tmp/codex-etsy-profit-tracker/error-scan.ndjson", errorCheck.ndjson, "utf8");

await fs.mkdir("/Users/enriquemorales/Desktop/Experiment/product", { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(JSON.stringify({ outputPath, previewDir }));
