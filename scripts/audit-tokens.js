// Token audit script — varre src/ e stories/ em busca de valores hardcoded
// Usage: node scripts/audit-tokens.js
// Exit code: always 0 (relata, não falha o build)
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ── token suggestion map (valor → nome do token) ──────────────────────────
const COLOR_SUGGESTIONS = {
  '#10131A': '--color-bg / --color-text-inverse / --primitive-neutral-950',
  '#161A27': '--color-surface / --primitive-neutral-900',
  '#1A1F2E': '--color-surface-raised / --primitive-neutral-850',
  '#232839': '--color-surface-overlay / --color-border-subtle / --primitive-neutral-800',
  '#F8F9FC': '--color-text-primary / --color-bg (light) / --primitive-neutral-50',
  '#9BA5BB': '--color-text-secondary / --primitive-neutral-400',
  '#4F5670': '--color-text-disabled / --primitive-neutral-600',
  '#363C54': '--color-border / --primitive-neutral-700',
  '#6B7494': '--color-border-strong / --primitive-neutral-500',
  '#CBD0DF': '--color-border (light) / --primitive-neutral-300',
  '#0082CF': '--color-brand (tech) / --primitive-tech-500',
  '#006BAA': '--color-brand-hover (tech) / --primitive-tech-600',
  '#005285': '--color-brand-active (tech) / --primitive-tech-700',
  '#766DE9': '--color-brand (pro) / --primitive-pro-500',
  '#5E57C4': '--color-brand-hover (pro) / --primitive-pro-600',
  '#47419E': '--color-brand-active (pro) / --primitive-pro-700',
  '#2F9000': '--color-brand (pag) / --primitive-pag-500',
  '#267300': '--color-brand-hover (pag) / --primitive-pag-600',
  '#1C5600': '--color-brand-active (pag) / --primitive-pag-700',
  '#4ADE80': '--color-success (dark) / --primitive-green-400',
  '#15803D': '--color-success (light) / --color-success-btn / --primitive-green-700',
  '#F87171': '--color-error (dark) / --primitive-red-400',
  '#B91C1C': '--color-error (light) / --primitive-red-700',
  '#DC2626': '--color-error-btn / --primitive-red-600',
  '#FCD34D': '--color-warning (dark) / --primitive-amber-300',
  '#B45309': '--color-warning (light) / --color-warning-btn / --primitive-amber-700',
  '#60A5FA': '--color-info (dark) / --primitive-blue-400',
  '#1D4ED8': '--color-info (light) / --color-info-btn / --primitive-blue-700',
};

const PX_SUGGESTIONS = {
  '44px': '--dimension-field-height-sm (2.75rem)',
  '56px': '--dimension-field-height-md (3.5rem)',
  '64px': '--dimension-field-height-lg (4rem)',
  '16px': '--dimension-field-padding-x / --primitive-spacing-3',
  '20px': '--dimension-field-padding-y-top',
  '8px':  '--primitive-spacing-2',
  '4px':  '--primitive-spacing-1 / --primitive-borderRadius-sm',
  '12px': '--dimension-field-icon-left / --primitive-borderRadius-lg',
  '52px': '--dimension-field-text-with-icon',
};

// ── patterns ──────────────────────────────────────────────────────────────
const PATTERNS = [
  {
    id:      'hex-color',
    label:   'Hex color hardcoded',
    regex:   /#([0-9a-fA-F]{3,8})\b/g,
    suggest: (match) => {
      const upper = match.toUpperCase();
      return COLOR_SUGGESTIONS[upper] || null;
    },
  },
  {
    id:      'rgba-rgb',
    label:   'rgba/rgb with numeric values',
    regex:   /rgba?\(\s*\d/g,
    suggest: () => 'Use a semantic token (ex: --color-success-muted, --color-brand-subtle)',
  },
  {
    id:      'inline-px',
    label:   'Inline style with px value',
    regex:   /style\s*=.*?\d+px/g,
    suggest: (match) => {
      for (const [px, tok] of Object.entries(PX_SUGGESTIONS)) {
        if (match.includes(px)) return tok;
      }
      return 'Use a CSS var token';
    },
  },
  {
    id:      'border-radius-px',
    label:   'border-radius with px (CSS)',
    regex:   /border-radius\s*:\s*\d+px/g,
    suggest: () => '--primitive-borderRadius-* ou --dimension-border-radius-field',
  },
  {
    id:      'box-shadow-rgba',
    label:   'box-shadow with rgba (CSS)',
    regex:   /box-shadow\s*:[^;]*rgba\s*\(/g,
    suggest: () => '--shadow-sm / --shadow / --shadow-md / --shadow-lg / --shadow-xl',
  },
  {
    id:      'font-weight-number',
    label:   'font-weight with numeric value (not var())',
    regex:   /font-weight\s*:\s*\d{3}(?!\s*\))/g,
    suggest: () => '--font-weight-{light|normal|medium|semibold|bold|extrabold}',
  },
];

// ── file walker ────────────────────────────────────────────────────────────
function walk(dir, exts, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules, .storybook internals, dist
      if (['node_modules', 'dist', '.git', 'storybook-static'].includes(entry.name)) continue;
      walk(full, exts, results);
    } else if (exts.some(e => full.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const TARGET_DIRS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'stories'),
];

const EXTS = ['.css', '.tsx', '.ts'];

const files = TARGET_DIRS.flatMap(d => walk(d, EXTS));

// ── audit ─────────────────────────────────────────────────────────────────
const violationsByCategory = {};
PATTERNS.forEach(p => { violationsByCategory[p.id] = []; });

const filesWithViolations = new Set();
const filesClean = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines   = content.split('\n');
  let fileHasViolation = false;

  for (const pattern of PATTERNS) {
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      let m;
      pattern.regex.lastIndex = 0;
      while ((m = pattern.regex.exec(line)) !== null) {
        const match   = m[0];
        const suggest = pattern.suggest(match);
        violationsByCategory[pattern.id].push({
          file:    path.relative(ROOT, file),
          line:    li + 1,
          match,
          suggest,
        });
        fileHasViolation = true;
      }
    }
  }

  if (fileHasViolation) filesWithViolations.add(file);
  else filesClean.add(file);
}

// ── output ─────────────────────────────────────────────────────────────────
const lines = [];
lines.push('# Token Audit Report\n');
lines.push(`Scanned ${files.length} files | ${filesWithViolations.size} with violations | ${filesClean.size} clean\n`);

let total = 0;
for (const pattern of PATTERNS) {
  const violations = violationsByCategory[pattern.id];
  total += violations.length;
  lines.push(`\n## ${pattern.label} (${violations.length})\n`);
  if (violations.length === 0) {
    lines.push('_Nenhuma violação_\n');
    continue;
  }
  lines.push('| Arquivo | Linha | Valor | Sugestão |');
  lines.push('|---------|-------|-------|---------|');
  for (const v of violations) {
    const sug = v.suggest ? `\`${v.suggest}\`` : '—';
    lines.push(`| \`${v.file}\` | ${v.line} | \`${v.match}\` | ${sug} |`);
  }
  lines.push('');
}

lines.push(`\n---\n**Total de violações:** ${total}\n`);

const report = lines.join('\n');
console.log(report);

// Totals por categoria
console.log('\n## Resumo por categoria\n');
for (const pattern of PATTERNS) {
  const count = violationsByCategory[pattern.id].length;
  console.log(`  ${count.toString().padStart(4)}  ${pattern.label}`);
}
console.log(`\n  Arquivos com violações : ${filesWithViolations.size}`);
console.log(`  Arquivos limpos        : ${filesClean.size}`);
console.log(`  Total de violações     : ${total}\n`);

process.exit(0);
