/* scripts/json_to_md.cjs
 * Usage: node scripts/json_to_md.cjs app/data/patient_journey.json content/source/patient_journey.md
 */
const fs = require('fs');
const path = require('path');

function esc(text = '') {
  return String(text).replace(/\r?\n/g, ' ').trim();
}

function toMd(data) {
  const lines = [];

  lines.push('<!--');
  lines.push('ROUND-TRIP FORMAT: DO NOT CHANGE HEADERS/KEYS');
  lines.push('- Stage header:  # Stage: <title> (id: <id>, order: <n>, icon: <emoji>)');
  lines.push('- Stage description: > <one line description>');
  lines.push('- Substage header: ## Substage: <title> (id: <id>)');
  lines.push('- Substage description: _Description_: <one line description>');
  lines.push('- Pain points list: ### Pain Points  + dash list');
  lines.push('- Tips: ### Tips then one or more tip blocks');
  lines.push('- Tip block: #### [<priority>] <title> (id: <id>)');
  lines.push('  Body: follows on the next paragraph lines until the next #### or ###');
  lines.push('');
  lines.push('Metadata (end of file):');
  lines.push('--- ');
  lines.push('version: <string>');
  lines.push('lastUpdated: <ISO date>');
  lines.push('source: <string>');
  lines.push('totals:');
  lines.push('  stages: <int>');
  lines.push('  substages: <int>');
  lines.push('-->');
  lines.push('');

  for (const stage of data.stages) {
    lines.push(
      `# Stage: ${esc(stage.title)} (id: ${stage.id}, order: ${stage.order}, icon: ${stage.icon})`
    );
    lines.push(`> ${esc(stage.description)}`);
    lines.push('');

    for (const ss of stage.substages) {
      lines.push(`## Substage: ${esc(ss.title)} (id: ${ss.id})`);
      lines.push(`_Description_: ${esc(ss.description)}`);
      lines.push('');
      if (ss.painPoints?.length) {
        lines.push('### Pain Points');
        for (const p of ss.painPoints) lines.push(`- ${esc(p)}`);
        lines.push('');
      }
      if (ss.tips?.length) {
        lines.push('### Tips');
        for (const t of ss.tips) {
          lines.push(`#### [${t.priority}] ${esc(t.title)} (id: ${t.id})`);
          lines.push(esc(t.body));
          lines.push('');
        }
      }
    }
    lines.push('');
  }

  lines.push('---');
  lines.push(`version: ${esc(data.metadata?.version ?? '')}`);
  lines.push(`lastUpdated: ${esc(data.metadata?.lastUpdated ?? '')}`);
  lines.push(`source: ${esc(data.metadata?.source ?? '')}`);
  const ts = Number(data.metadata?.totalStages ?? data.stages?.length ?? 0);
  const tss = Number(
    data.metadata?.totalSubstages ??
      (data.stages || []).reduce((acc, s) => acc + (s.substages?.length || 0), 0)
  );
  lines.push('totals:');
  lines.push(`  stages: ${ts}`);
  lines.push(`  substages: ${tss}`);
  lines.push('');

  return lines.join('\n');
}

function main() {
  const [,, inPath, outPath] = process.argv;
  if (!inPath || !outPath) {
    console.error('Usage: node scripts/json_to_md.cjs <input.json> <output.md>');
    process.exit(1);
  }
  const json = JSON.parse(fs.readFileSync(path.resolve(inPath), 'utf8'));
  const md = toMd(json);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(path.resolve(outPath), md, 'utf8');
  console.log(`✅ Wrote ${outPath}`);
}

main();
