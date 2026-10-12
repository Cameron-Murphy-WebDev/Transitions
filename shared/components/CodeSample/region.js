// Slices a `?raw` source string down to a marked region:
//
//   // #region state          ...or, inside JSX:  {/* #region carousel */}
//   const [active, setActive] = useState(0);
//   // #endregion state
//
// Markers move with the code, so a region keeps showing the right lines after
// edits above it — which a hardcoded line range would not.
//
// A name can be used more than once in a file. Every block carrying it is shown,
// in file order and separated by a blank line, so one panel can gather lines that
// aren't neighbours.

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

  // Collected a block at a time: a matching start marker opens one, and the next
  // end marker — whatever name it carries — closes it. Marker lines themselves
  // never reach the panel, so a block nested inside another loses its markers
  // rather than showing them.
  const blocks = [];
  let open = null;

  lines.forEach((line) => {
    const marker = readMarker(line);

    if (marker && !marker.end && marker.name === name) open = [];
    else if (open && marker?.end) {
      blocks.push(open);
      open = null;
    } else if (open && !marker) open.push(line);
  });

  // Nothing marked with that name — a typo in the prop, most likely. Show the
  // whole file rather than an empty panel. A block left unclosed is dropped the
  // same way, since `open` never reaches `blocks`.
  if (!blocks.length) return code;

  // Blank line between blocks so stacked ranges don't read as one run of code.
  const body = blocks.flatMap((block, index) =>
    index ? ['', ...block] : block,
  );

  // A region lifted from inside a function arrives indented; strip the shared
  // leading whitespace so it reads flush in a narrow panel.
  const indents = body
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)[0].length);
  const indent = indents.length ? Math.min(...indents) : 0;

  return body.map((line) => line.slice(indent)).join('\n');
}
