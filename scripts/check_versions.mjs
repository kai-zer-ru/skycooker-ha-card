import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readTrim(file) {
  return readFileSync(path.join(root, file), 'utf8').trim();
}

const version = readTrim('VERSION');
const makefile = readFileSync(path.join(root, 'Makefile'), 'utf8');
const makefileMatch = makefile.match(/^VERSION \?= (.+)$/m);
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));

const errors = [];

if (!makefileMatch) {
  errors.push('Makefile: could not parse VERSION ?=');
} else if (makefileMatch[1].trim() !== version) {
  errors.push(`VERSION (${version}) != Makefile (${makefileMatch[1].trim()})`);
}

if (pkg.version !== version) {
  errors.push(`VERSION (${version}) != package.json (${pkg.version})`);
}

const constSrc = readFileSync(path.join(root, 'src/const.ts'), 'utf8');
const cardMatch = constSrc.match(/export const CARD_VERSION = "([^"]+)";/);
if (!cardMatch) {
  errors.push('src/const.ts: could not parse CARD_VERSION');
} else if (cardMatch[1] !== version) {
  errors.push(`VERSION (${version}) != CARD_VERSION (${cardMatch[1]})`);
}

if (errors.length) {
  for (const err of errors) {
    console.error(`check_versions: ${err}`);
  }
  process.exit(1);
}

console.log(`check_versions: ok (${version})`);
