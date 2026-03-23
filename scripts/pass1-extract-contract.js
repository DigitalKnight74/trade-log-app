const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const INPUT_XLSX = path.join(__dirname, "..", "contract", "Naming_Convention_v1.0 - Approved_for_Build.xlsx");
const OUTPUT_JSON = path.join(__dirname, "..", "contract", "contract.json");

const FUNCTION_SHEET = "Function_Names";
const VARIABLE_SHEET = "Variable_Names";

function cleanString(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function splitList(value) {
  const raw = cleanString(value);
  if (!raw) return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupe(list) {
  return [...new Set(list)];
}

function normalizeDataType(dataType) {
  const raw = cleanString(dataType).toLowerCase();

  const map = {
    string: "string",
    number: "number",
    boolean: "boolean",
    object: "object",
    array: "array",
    datetime: "datetime",
    datetimestamp: "datetime",
    "date/time": "datetime",
    integer: "number",
    decimal: "number",
    "2-choice selection": "enum",
    "3-choice selection": "enum",
    "4-choice selection": "enum",
    "5-choice selection": "enum",
    "6-choice selection": "enum",
    "7-choice selection": "enum",
  };

  return map[raw] || raw || "unknown";
}

function assertRequired(value, fieldName, rowIndex, sheetName) {
  if (!cleanString(value)) {
    throw new Error(
      `Missing required value in sheet "${sheetName}", row ${rowIndex + 2}, column "${fieldName}"`
    );
  }
}

function readSheetRows(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in workbook.`);
  }

  return XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });
}

function parseFunctions(rows) {
  return rows.map((row, index) => {
    assertRequired(row.Name, "Name", index, FUNCTION_SHEET);

    return {
      name: cleanString(row.Name),
      purpose: cleanString(row.Purpose),
      status: cleanString(row.Status) || "Needs Review",
    };
  });
}

function parseVariables(rows) {
  return rows.map((row, index) => {
    assertRequired(row.Name, "Name", index, VARIABLE_SHEET);

    const enumValues = splitList(row.EnumValues);
    const payloadTypes = splitList(row.PayloadTypes);

    return {
      name: cleanString(row.Name),
      dataType: normalizeDataType(row.DataType),
      rawDataType: cleanString(row.DataType),
      domainArea: cleanString(row.DomainArea),
      enumValues: dedupe(enumValues),
      payloadTypes: dedupe(payloadTypes),
      purpose: cleanString(row.Purpose),
      status: cleanString(row.Status) || "Needs Review",
    };
  });
}

function buildContract(functions, variables) {
  const enums = variables.filter((v) => v.enumValues.length > 0);

  const payloadTypeMap = {};
  for (const variable of variables) {
    for (const payloadType of variable.payloadTypes) {
      if (!payloadTypeMap[payloadType]) {
        payloadTypeMap[payloadType] = [];
      }
      payloadTypeMap[payloadType].push(variable.name);
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    sourceFile: "Naming_Convention.xlsx",
    sheets: {
      functions: FUNCTION_SHEET,
      variables: VARIABLE_SHEET,
    },
    summary: {
      functionCount: functions.length,
      variableCount: variables.length,
      enumBackedVariableCount: enums.length,
      payloadTypeCount: Object.keys(payloadTypeMap).length,
    },
    functions,
    variables,
    payloadTypes: payloadTypeMap,
  };
}

function main() {
  if (!fs.existsSync(INPUT_XLSX)) {
    throw new Error(`Input workbook not found: ${INPUT_XLSX}`);
  }

  const workbook = XLSX.readFile(INPUT_XLSX);

  const functionRows = readSheetRows(workbook, FUNCTION_SHEET);
  const variableRows = readSheetRows(workbook, VARIABLE_SHEET);

  const functions = parseFunctions(functionRows);
  const variables = parseVariables(variableRows);

  const contract = buildContract(functions, variables);

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(contract, null, 2), "utf8");

  console.log(`Contract extracted successfully -> ${OUTPUT_JSON}`);
  console.log(JSON.stringify(contract.summary, null, 2));
}

main();