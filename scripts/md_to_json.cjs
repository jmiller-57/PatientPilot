/* scripts/md_to_json.cjs
 * Usage: node scripts/md_to_json.cjs content/source/patient_journey.md app/data/patient_journey.json
 * Strict parser for the format defined in the MD header comment.
 */
const fs = require('fs');
const path = require('path');

function parseMd(md) {
  const lines = md.split(/\r?\n/);
  const data = { stages: [], metadata: { version: '', lastUpdated: '', source: '', totalStages: 0, totalSubstages: 0 } };

  let i = 0;
  function peek() { return lines[i] ?? ''; }
  function next() { return lines[i++] ?? ''; }
  function skipBlank() { while (i < lines.length && !lines[i].trim()) i++; }

  function parseStageHeader(line) {
    // "# Stage: Title (id: x, order: n, icon: y)"
    const m = line.match(/^# Stage:\s*(.+)\s*\(id:\s*([^,\s]+),\s*order:\s*(\d+),\s*icon:\s*(.+)\)$/);
    if (!m) throw new Error(`Invalid stage header: ${line}`);
    return { title: m[1].trim(), id: m[2].trim(), order: Number(m[3]), icon: m[4].trim() };
  }

  function parseSubstageHeader(line) {
    // "## Substage: Title (id: x)"
    const m = line.match(/^## Substage:\s*(.+)\s*\(id:\s*([^)]+)\)$/);
    if (!m) throw new Error(`Invalid substage header: ${line}`);
    return { title: m[1].trim(), id: m[2].trim() };
  }

  function parseTipHeader(line) {
    // "#### [priority] Title (id: x)"
    const m = line.match(/^#### \[([a-z]+)\]\s*(.+)\s*\(id:\s*([^)]+)\)$/i);
    if (!m) throw new Error(`Invalid tip header: ${line}`);
    return { priority: m[1].toLowerCase(), title: m[2].trim(), id: m[3].trim() };
  }

  while (i < lines.length) {
    const line = next();

    // Stage header
    if (line.startsWith('# Stage:')) {
      const { title, id, order, icon } = parseStageHeader(line);
      // Stage description line expected next starting with ">"
      let descLine = next().trim();
      if (!descLine.startsWith('>')) throw new Error(`Expected stage description after header for ${id}`);
      const description = descLine.replace(/^>\s?/, '').trim();

      const stage = { id, title, description, order, icon, substages: [] };
      data.stages.push(stage);

      // consume until next stage or metadata
      while (i < lines.length) {
        skipBlank();
        const cur = peek();

        if (cur.startsWith('# Stage:') || cur.startsWith('---')) break;

        if (cur.startsWith('## Substage:')) {
          // parse substage
          const { title: ssTitle, id: ssId } = parseSubstageHeader(next());
          let desc = next().trim();
          if (!desc.startsWith('_Description_:')) throw new Error(`Expected substage description for ${ssId}`);
          const description = desc.replace(/^_Description_:\s?/, '').trim();

          const substage = { id: ssId, title: ssTitle, description, painPoints: [], tips: [] };
          stage.substages.push(substage);

          // parse sections under substage
          while (i < lines.length) {
            skipBlank();
            const cur2 = peek();
            if (!cur2) break;
            if (cur2.startsWith('## Substage:') || cur2.startsWith('# Stage:') || cur2.startsWith('---')) break;

            if (cur2.startsWith('### Pain Points')) {
              next(); // consume header
              skipBlank();
              while (i < lines.length && peek().startsWith('- ')) {
                substage.painPoints.push(next().slice(2).trim());
              }
              continue;
            }

            if (cur2.startsWith('### Tips')) {
              next(); // consume header
              skipBlank();
              while (i < lines.length && peek().startsWith('#### ')) {
                const { priority, title: tTitle, id: tId } = parseTipHeader(next());
                const bodyLines = [];
                while (i < lines.length) {
                  const l = peek();
                  if (!l || l.startsWith('#### ') || l.startsWith('### ') || l.startsWith('## ') || l.startsWith('# ') || l.startsWith('---')) break;
                  bodyLines.push(next());
                }
                substage.tips.push({ id: tId, title: tTitle, body: bodyLines.join('\n').trim(), priority });
                skipBlank();
              }
              continue;
            }

            // Unknown line under substage; break to avoid infinite loop
            break;
          }
        } else {
          // Unknown section under stage, break
          break;
        }
      }
      continue;
    }

    // Metadata block at end
    if (line.startsWith('---')) {
      // very simple YAML-ish tail
      while (i < lines.length) {
        const l = next().trim();
        if (!l) continue;
        if (l.startsWith('version:')) data.metadata.version = l.split(':').slice(1).join(':').trim();
        else if (l.startsWith('lastUpdated:')) data.metadata.lastUpdated = l.split(':').slice(1).join(':').trim();
        else if (l.startsWith('source:')) data.metadata.source = l.split(':').slice(1).join(':').trim();
        else if (l.startsWith('totals:')) {
          // read next two lines
          const s1 = (next() || '').trim();
          const s2 = (next() || '').trim();
          const m1 = s1.match(/^stages:\s*(\d+)/) || s1.match(/^\s*stages:\s*(\d+)/);
          const m2 = s2.match(/^substages:\s*(\d+)/) || s2.match(/^\s*substages:\s*(\d+)/);
          if (m1) data.metadata.totalStages = Number(m1[1]);
          if (m2) data.metadata.totalSubstages = Number(m2[1]);
        }
      }
      break;
    }
  }

  return data;
}

function main() {
  const [,, inPath, outPath] = process.argv;
  if (!inPath || !outPath) {
    console.error('Usage: node scripts/md_to_json.cjs <input.md> <output.json>');
    process.exit(1);
  }
  const md = fs.readFileSync(path.resolve(inPath), 'utf8');
  const data = parseMd(md);

  // sanity: sort by order, maintain given order otherwise
  data.stages.sort((a, b) => a.order - b.order);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(path.resolve(outPath), JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Wrote ${outPath}`);
}

main();
