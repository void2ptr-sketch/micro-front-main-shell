// Сравнение plans/external-deps.csv и plans/Опросник.v2.csv
// по полям: name === Наименование ПО, version NEW === Версия ПО.
// Несовпавшие записи сохраняются в plans/external-deps.new.csv
import { readFileSync, writeFileSync } from 'node:fs';

const DEPS_FILE = 'plans/external-deps.csv';
const SURVEY_FILE = 'plans/Опросник.v2.csv';
const OUT_FILE = 'plans/external-deps.new.csv';

// --- Простой CSV-токенизатор с поддержкой кавычек ---
function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

function splitOnDelim(line, delim) {
  return line.split(delim);
}

// --- Чтение external-deps.csv (';', заголовок в 1-й строке) ---
const depsLines = readFileSync(DEPS_FILE, 'utf8')
  .replace(/^\uFEFF/, '')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

const depsHeader = splitOnDelim(depsLines[0], ';');
const idxNameDeps = depsHeader.indexOf('name');
const idxVersionNew = depsHeader.indexOf('version NEW');

const depsRows = depsLines.slice(1).map((l) => splitOnDelim(l, ';'));
const depsByName = new Map();
for (const r of depsRows) {
  const name = (r[idxNameDeps] || '').trim();
  if (!name) continue;
  depsByName.set(name, r);
}

// --- Чтение Опросник.v2.csv (',', с кавычками; строка 1 — заметка, строка 2 — заголовок) ---
const surveyLines = readFileSync(SURVEY_FILE, 'utf8')
  .replace(/^\uFEFF/, '')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

// заголовок — 2-я непустая строка (1-я — служебная заметка)
const surveyHeader = parseCsvLine(surveyLines[1]);
const idxNameSurvey = surveyHeader.indexOf('Наименование ПО');
const idxVersionSurvey = surveyHeader.indexOf('Версия ПО');

// name -> Set(версий), т.к. в опроснике возможны дубликаты одного ПО
const surveyByName = new Map();
for (let i = 2; i < surveyLines.length; i++) {
  const f = parseCsvLine(surveyLines[i]);
  const name = (f[idxNameSurvey] || '').trim();
  if (!name) continue;
  const ver = (f[idxVersionSurvey] || '').trim();
  if (!surveyByName.has(name)) surveyByName.set(name, new Set());
  surveyByName.get(name).add(ver);
}

// --- Сравнение ---
const outHeader = [...depsHeader, 'Версия ПО (опросник)', 'Статус'];
const mismatches = [];

for (const r of depsRows) {
  const name = (r[idxNameDeps] || '').trim();
  if (!name) continue;
  const depsVersion = (r[idxVersionNew] || '').trim();

  if (!surveyByName.has(name)) {
    mismatches.push([...r, '', 'не найден в опроснике']);
    continue;
  }
  const surveyVersions = surveyByName.get(name);
  if (!surveyVersions.has(depsVersion)) {
    mismatches.push([
      ...r,
      [...surveyVersions].join(' | '),
      'версия не совпадает',
    ]);
  }
}

const content = '\uFEFF' + [outHeader.join(';'), ...mismatches.map((m) => m.join(';'))].join('\n');
writeFileSync(OUT_FILE, content, 'utf8');

console.log(`Всего записей в external-deps.csv: ${depsRows.length}`);
console.log(`Наименований в Опросник.v2.csv: ${surveyByName.size}`);
console.log(`Несовпадений (сохранено в ${OUT_FILE}): ${mismatches.length}`);