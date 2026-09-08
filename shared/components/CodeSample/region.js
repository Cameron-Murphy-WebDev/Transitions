// Slices a `?raw` source string down to a marked region:
//
//   // #region state          ...or, inside JSX:  {/* #region carousel */}
//   const [active, setActive] = useState(0);
//   // #endregion state
//
// Markers move with the code, so a region keeps showing the right lines after
// edits above it — which a hardcoded line range would not.

const COMMENT = /^\s*(?:\/\/|\{?\/\*)/;
const MARKER = /#(end)?region\b\s*(.*)/;

function readMarker(line) {
  if (!COMMENT.test(line)) return null;
  const match = line.match(MARKER);
  if (!match) return null;

  return {
    end: Boolean(match[1]),
    // Drop the tail of a block/JSX comment: `#region carousel */}`
    name: match[2].replace(/\*\/\s*\}?\s*$/, '').trim(),
  };
}

export default function pickRegion(code, name) {
  const lines = code.split('\n');

  // No region requested: show the whole file, minus the marker comments so they
  // don't clutter panels that aren't using them.
  if (!name) return lines.filter((line) => !readMarker(line)).join('\n');

  const start = lines.findIndex((line) => {
    const found = readMarker(line);
    return found && !found.end && found.name === name;
  });
  if (start === -1) return code;

  const end = lines.findIndex(
    (line, index) => index > start && readMarker(line)?.end,
  );
  if (end === -1) return code;

  const body = lines.slice(start + 1, end).filter((line) => !readMarker(line));

  // A region lifted from inside a function arrives indented; strip the shared
  // leading whitespace so it reads flush in a narrow panel.
  const indents = body
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)[0].length);
  const indent = indents.length ? Math.min(...indents) : 0;

  return body.map((line) => line.slice(indent)).join('\n');
}
