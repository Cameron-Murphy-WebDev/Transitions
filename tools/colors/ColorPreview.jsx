import React from 'react';
// The palette itself, as text. Parsing it means every variable shows up here
// automatically — add one to color.scss and it appears, with no list to update.
import colorSource from '@sass/color.scss?raw';
import Monogram from '@shared/images/Monogram.svg?react';
import './ColorPreview.scss';

// `$name: #hex;` or `$name: $other-variable;`
const DECLARATION = /^\s*\$([\w-]+)\s*:\s*([^;]+);/;

// color.scss separates its blocks with blank lines, so the file's own grouping
// becomes the grouping on the page.
const GROUP_NAMES = ['Base colors', 'Brights', 'Roles'];

// Every swatch repeats its name once per text colour, labelled with the variable
// painting it, so all four foregrounds can be judged against each background.
const TEXT_TONES = [
  { variable: '$font-light', className: 'Light' },
  { variable: '$near-black', className: 'Dark' },
  { variable: '$light-lavender', className: 'Lavender' },
  { variable: '$white', className: 'White' },
];

function readPalette(source) {
  const resolved = new Map();
  const blocks = [[]];

  source.split('\n').forEach((line) => {
    if (!line.trim()) {
      // Only start a new block once the current one has something in it, so
      // repeated blank lines don't create empty groups.
      if (blocks[blocks.length - 1].length) blocks.push([]);
      return;
    }

    const match = line.match(DECLARATION);
    if (!match) return;

    const [, name, rawValue] = match;
    const value = rawValue.trim();
    // Roles point at an earlier variable; follow it to the hex it lands on.
    const hex = value.startsWith('$') ? resolved.get(value.slice(1)) : value;
    if (!hex) return;

    resolved.set(name, hex);
    blocks[blocks.length - 1].push({ name, hex });
  });

  return blocks
    .filter((block) => block.length)
    .map((swatches, index) => ({
      name: GROUP_NAMES[index] ?? `Group ${index + 1}`,
      swatches,
    }));
}

const groups = readPalette(colorSource);

export default function ColorPreview() {
  return (
    <div className='ColorPreview'>
      <h1>Color Preview</h1>

      <h2 className='ColorPreview-GroupTitle'>Monogram</h2>
      <div className='ColorPreview-Svg'>
        <Monogram className='Large' />
        <Monogram className='Small' />
        <div className='ColorPreview-SvgOnLight'>
          <Monogram className='Small' />
        </div>
      </div>

      {groups.map((group) => (
        <React.Fragment key={group.name}>
          <h2 className='ColorPreview-GroupTitle'>{group.name}</h2>
          <div className='ColorPreview-Grid'>
            {group.swatches.map(({ name, hex }) => (
              <div
                className='ColorPreview-Swatch'
                style={{ background: hex }}
                key={name}
              >
                {TEXT_TONES.map((tone) => (
                  <span
                    className={`ColorPreview-Name ${tone.className}`}
                    key={tone.variable}
                  >
                    ${name} (in {tone.variable})
                  </span>
                ))}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
