#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

usage() {
	echo "Usage: make version vX.Y.Z" >&2
	echo "       scripts/set_version.sh vX.Y.Z" >&2
	exit 1
}

[[ $# -eq 1 ]] || usage

raw="$1"
ver="${raw#v}"

if ! [[ "$ver" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$ ]]; then
	echo "set_version: invalid semver: $raw" >&2
	exit 1
fi

printf '%s\n' "$ver" > VERSION
sed -i "s/^VERSION ?= .*/VERSION ?= ${ver}/" Makefile

node - "$ver" <<'NODE'
const fs = require('fs');

const ver = process.argv[2];
if (!ver) {
  console.error('set_version: missing version argument');
  process.exit(1);
}
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = ver;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const lockPath = 'package-lock.json';
if (fs.existsSync(lockPath)) {
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  lock.version = ver;
  if (lock.packages && lock.packages['']) {
    lock.packages[''].version = ver;
  }
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
}

const constPath = 'src/const.ts';
if (fs.existsSync(constPath)) {
  const src = fs.readFileSync(constPath, 'utf8');
  const next = src.replace(
    /export const CARD_VERSION = "[^"]+";/,
    `export const CARD_VERSION = "${ver}";`
  );
  if (next !== src) {
    fs.writeFileSync(constPath, next);
  }
}
NODE

echo "set_version: ${ver}"
echo "  VERSION"
echo "  Makefile"
echo "  package.json"
if [[ -f package-lock.json ]]; then
	echo "  package-lock.json"
fi
if [[ -f src/const.ts ]]; then
	echo "  src/const.ts (CARD_VERSION)"
fi
