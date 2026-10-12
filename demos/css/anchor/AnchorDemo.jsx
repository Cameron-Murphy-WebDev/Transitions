import React, { useState } from 'react';
import CodeSample from '@shared/components/CodeSample';
import DemoPage from '@shared/components/DemoPage';
import './AnchorDemo.scss';
// `?raw` hands back the file's text, so saving the stylesheet updates the panel
// beside the demo. The `anchor` region marks the two blocks doing the anchoring.
import anchorStyles from './AnchorDemo.scss?raw';
import Arrow from '@shared/images/arrow.svg?react';
import ArrowRotate from '@shared/images/arrow-rotate.svg?react';

export default function AnchorDemo() {
  const [anchorPosition, setAnchorPosition] = useState('Top');
  const arrowClasses = ['Top', 'Right', 'Bottom', 'Left'];
  function getButtons() {
    return arrowClasses.map((arrowClass) => {
      return (
        <button
          key={arrowClass}
          className='Arrow-Button'
          style={{ positionArea: arrowClass }}
          onClick={() => {
            setAnchorPosition(arrowClass);
          }}
        >
          <Arrow className={`Arrow ${arrowClass}`} />
        </button>
      );
    });
  }

  return (
    <DemoPage
      className='AnchorDemo'
      heading={
        <hgroup className='Full'>
          <h1>Anchor API</h1>
          <p>
            from{' '}
            <a href='https://www.joshwcomeau.com/css/anchor-positioning/'>
              joshwcom-eau.com
            </a>
          </p>
        </hgroup>
      }
    >
      <div className='Anchor-Demo Half'>
        <div className='Anchor-Container'>
          <div className='Anchor-Middle'>
            <ArrowRotate className='Arrow-Rotate' />
          </div>
          {getButtons()}
        </div>
        <div className={`Target ${anchorPosition}`}>{anchorPosition}</div>
      </div>
      <CodeSample
        className='Half'
        code={anchorStyles}
        label='AnchorDemo.scss'
        lang='scss'
        region='anchor'
      />
    </DemoPage>
  );
}
