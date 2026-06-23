// AUTO-GENERATED build script — reads src/tokens/json/ and emits src/styles/tokens-generated.css
// Usage: node scripts/build-tokens.js
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const JSON_DIR = path.join(ROOT, 'src', 'tokens', 'json');
const OUT_FILE = path.join(ROOT, 'src', 'styles', 'tokens-generated.css');

// ── helpers ────────────────────────────────────────────────────────────────

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Flatten a Style-Dictionary-style nested JSON to a list of { varName, value } pairs.
 * Leaf nodes are objects with a `value` key.
 *
 * @param {object} obj
 * @param {string} prefix  — CSS var prefix (without leading --)
 * @returns {{ varName: string, value: string }[]}
 */
function flatten(obj, prefix) {
  const entries = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${k}` : k;
    if (v && typeof v === 'object' && 'value' in v) {
      entries.push({ varName: key, value: String(v.value) });
    } else if (v && typeof v === 'object') {
      entries.push(...flatten(v, key));
    }
  }
  return entries;
}

function renderBlock(selector, entries, indent = '  ') {
  const lines = entries.map(({ varName, value }) => `${indent}--${varName}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}

// ── load files ─────────────────────────────────────────────────────────────

const primColor   = readJson(path.join(JSON_DIR, 'primitives', 'color.json'));
const primNumber  = readJson(path.join(JSON_DIR, 'primitives', 'number.json'));
const semDark     = readJson(path.join(JSON_DIR, 'semantic', 'dark.json'));
const semLight    = readJson(path.join(JSON_DIR, 'semantic', 'light.json'));
const semTech     = readJson(path.join(JSON_DIR, 'semantic', 'brand-tech.json'));
const semPro      = readJson(path.join(JSON_DIR, 'semantic', 'brand-pro.json'));
const semPag      = readJson(path.join(JSON_DIR, 'semantic', 'brand-pag.json'));
const typo        = readJson(path.join(JSON_DIR, 'typography.json'));
const dim         = readJson(path.join(JSON_DIR, 'dimension.json'));
const textStyles  = readJson(path.join(JSON_DIR, 'text-styles.json'));

// ── derive CSS var lists ───────────────────────────────────────────────────

// Primitives: prefix "primitive-{palette}"
const primColorEntries = flatten(primColor, 'primitive');

// Spacing / borderRadius / breakpoint from number.json — prefix "primitive-{category}"
const primNumberEntries = flatten(primNumber, 'primitive');

// Semantic tokens: keys are already the var name (flat)
function flattenSemantic(obj) {
  return Object.entries(obj).map(([k, v]) => ({ varName: k, value: String(v.value) }));
}

const darkEntries  = flattenSemantic(semDark);
const lightEntries = flattenSemantic(semLight);
const techEntries  = flattenSemantic(semTech);
const proEntries   = flattenSemantic(semPro);
const pagEntries   = flattenSemantic(semPag);

// Typography: flatten with prefix "font"
function flattenTypo(obj) {
  const entries = [];
  for (const [cat, tokens] of Object.entries(obj)) {
    // map category → css prefix segment
    const seg = {
      fontFamily:    'font-family',
      fontSize:      'font-size',
      fontWeight:    'font-weight',
      lineHeight:    'line-height',
      letterSpacing: 'letter-spacing',
    }[cat] || cat;
    for (const [k, v] of Object.entries(tokens)) {
      entries.push({ varName: `${seg}-${k}`, value: String(v.value) });
    }
  }
  return entries;
}
const typoEntries = flattenTypo(typo);

// Dimension tokens: prefix "dimension"
const dimEntries = flatten(dim, 'dimension');

// Text styles: prefix "text"
const textStyleEntries = flatten(textStyles, 'text');

// ── assemble CSS ───────────────────────────────────────────────────────────

const header = `/* AUTO-GENERATED — edite src/tokens/json/ e rode: npm run tokens:build */\n/* gerado em: ${new Date().toISOString()} */\n\n`;

const primitiveBlock = renderBlock(
  ':root',
  [...primColorEntries, ...primNumberEntries, ...typoEntries, ...dimEntries, ...textStyleEntries],
);

const darkBlock  = renderBlock(':root,\n[data-theme="dark"]', darkEntries);
const lightBlock = renderBlock('[data-theme="light"]',        lightEntries);
const techBlock  = renderBlock(':root,\n[data-brand="tech"]', techEntries);
const proBlock   = renderBlock('[data-brand="pro"]',          proEntries);
const pagBlock   = renderBlock('[data-brand="pag"]',          pagEntries);

const css = [
  header,
  '/* ── Primitive tokens ──────────────────────────────────────────── */\n',
  primitiveBlock,
  '\n/* ── Semantic dark (default) ───────────────────────────────────── */\n',
  darkBlock,
  '\n/* ── Semantic light ────────────────────────────────────────────── */\n',
  lightBlock,
  '\n/* ── Brand: D9 Tech ────────────────────────────────────────────── */\n',
  techBlock,
  '\n/* ── Brand: D9 Pro ─────────────────────────────────────────────── */\n',
  proBlock,
  '\n/* ── Brand: D9 Pag ─────────────────────────────────────────────── */\n',
  pagBlock,
].join('');

fs.writeFileSync(OUT_FILE, css, 'utf8');

const totalVars = primColorEntries.length + primNumberEntries.length + typoEntries.length +
  dimEntries.length + textStyleEntries.length + darkEntries.length + lightEntries.length +
  techEntries.length + proEntries.length + pagEntries.length;

console.log(`✓ tokens-generated.css escrito em ${OUT_FILE}`);
console.log(`  ${totalVars} CSS custom properties geradas`);
