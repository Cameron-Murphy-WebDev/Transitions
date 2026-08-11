import React from 'react';
import './ColorPreview.scss';

const groups = [
  {
    name: 'toolbar',
    swatches: [
      ['toolbar.activeBackground', '#2c324a'],
      ['toolbar.hoverBackground', '#2c324a'],
    ],
  },
  {
    name: 'extensionButton / extensionBadge',
    swatches: [
      ['extensionButton.prominentBackground', '#3d59a1dd'],
      ['extensionButton.prominentHoverBackground', '#3d59a1aa'],
      ['extensionButton.prominentForeground', '#ffffff'],
      ['extensionBadge.remoteBackground', '#3d59a1'],
      ['extensionBadge.remoteForeground', '#ffffff'],
    ],
  },
  {
    name: 'button / progressBar',
    swatches: [
      ['button.background', '#3d59a1dd'],
      ['button.hoverBackground', '#3d59a1aa'],
      ['button.secondaryBackground', '#41496b'],
      ['button.foreground', '#ffffff'],
      ['progressBar.background', '#3d59a1'],
    ],
  },
  {
    name: 'input / inputOption',
    swatches: [
      ['input.background', '#1b1e2e'],
      ['input.foreground', '#a9b1d6'],
      ['input.border', '#282e44'],
      ['input.placeholderForeground', '#4a5272'],
      ['inputOption.activeForeground', '#c0caf5'],
      ['inputOption.activeBackground', '#3d59a144'],
    ],
  },
  {
    name: 'inputValidation',
    swatches: [
      ['inputValidation.infoForeground', '#bbc2e0'],
      ['inputValidation.infoBackground', '#3d59a15c'],
      ['inputValidation.infoBorder', '#3d59a1'],
      ['inputValidation.warningForeground', '#000000'],
      ['inputValidation.warningBackground', '#c2985b'],
      ['inputValidation.warningBorder', '#e0af68'],
      ['inputValidation.errorForeground', '#bbc2e0'],
      ['inputValidation.errorBackground', '#85353e'],
      ['inputValidation.errorBorder', '#963c47'],
    ],
  },
];

export default function ColorPreview() {
  return (
    <div className='ColorPreview'>
      <h1>Color Preview</h1>
      {groups.map((group) => (
        <React.Fragment key={group.name}>
          <h2 className='ColorPreview-GroupTitle'>{group.name}</h2>
          <div className='ColorPreview-Grid'>
            {group.swatches.map(([name, hex]) => (
              <div className='ColorPreview-Swatch' key={name}>
                <div className='ColorPreview-Chip'>
                  <span style={{ background: hex }} />
                </div>
                <div className='ColorPreview-Meta'>
                  <span className='ColorPreview-Name'>{name}</span>
                  <span className='ColorPreview-Hex'>{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
