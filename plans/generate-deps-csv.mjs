// Генератор полного CSV внешних зависимостей из package-lock.json
import { readFileSync, writeFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const pkgJson = JSON.parse(readFileSync('package.json', 'utf8'));

const directNames = new Set([
  ...Object.keys(pkgJson.dependencies || {}),
  ...Object.keys(pkgJson.devDependencies || {}),
]);

// name -> Set(requirers)
const requirers = new Map();
const packages = [];

for (const [path, info] of Object.entries(lock.packages)) {
  if (path === '') continue; // корневой пакет
  // имя пакета = часть пути после последнего 'node_modules/'
  const name = path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);
  packages.push({ path, name, version: info.version || '' });
  // фиксируем, кто подтянул этот пакет (по файловой структуре lockfile)
  if (info.dependencies) {
    for (const depName of Object.keys(info.dependencies)) {
      if (!requirers.has(depName)) requirers.set(depName, new Set());
      requirers.get(depName).add(name);
    }
  }
}

// дедупликация по имени (берём версию, реально установленную в корне при наличии)
const byName = new Map();
for (const p of packages) {
  if (!byName.has(p.name)) byName.set(p.name, []);
  byName.get(p.name).push(p);
}

function parentFor(name) {
  if (directNames.has(name)) return 'direct';
  const set = requirers.get(name);
  if (!set || set.size === 0) return 'transitive (не определено по lockfile)';
  return [...set].sort().join(', ');
}

function npmUrl(name, version) {
  // для scoped-пакетов берём часть после '/' (напр. platform-browser для @angular/platform-browser)
  const bareName = name.startsWith('@') ? name.slice(name.indexOf('/') + 1) : name;
  return `https://registry.npmjs.org/${name}/-/${bareName}-${version}.tgz`;
}

const rows = [];
for (const [name, vers] of byName) {
  // предпочитаем версию из корня node_modules
  const root = vers.find((v) => v.path === `node_modules/${name}`);
  const chosen = root || vers[0];
  const dep = parentFor(name);
  const comment =
    dep === 'direct'
      ? ''
      : 'Транзитивная зависимость. Версию менять только через npm update / пересборку lockfile; самостоятельный апгрейд может нарушить peer-зависимости родителя.';
  rows.push({
    name,
    old: chosen.version,
    dep,
    url: npmUrl(name, chosen.version),
    alt: `npm install ${name}@${chosen.version}`,
    comment,
  });
}

// группировка: прямые сначала, затем транзитивные; внутри — алфавит
const direct = rows.filter((r) => r.dep === 'direct').sort((a, b) => a.name.localeCompare(b.name));
const trans = rows.filter((r) => r.dep !== 'direct').sort((a, b) => a.name.localeCompare(b.name));
const sorted = [...direct, ...trans];

const header = 'name;version OLD;version NEW;URL к репозиторию;alternative;dependency;комментарий';
const lines = sorted.map((r) =>
  [
    r.name,
    r.old,
    r.old, // для транзитивных актуальная зафиксированная версия и есть максимум, разрешённый constraint-ами на момент установки
    r.url,
    r.alt,
    r.dep,
    r.comment,
  ].join(';')
);

writeFileSync('plans/external-deps.csv', '\uFEFF' + [header, ...lines].join('\n'), 'utf8');

console.log(`Всего пакетов: ${sorted.length}`);
console.log(`Прямых: ${direct.length}, транзитивных: ${trans.length}`);
