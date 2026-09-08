import React, { useState } from 'react';
import DemoPage from '@shared/components/DemoPage';
import './AnchorDemo.scss';

export default function AnchorDemo() {
  const [targetOpen, setTargetOpen] = useState(false);

  return (
    <DemoPage
      className='AnchorDemo'
      heading={
        <hgroup className='Full'>
          <h1>Anchor API</h1>
          <p>
            from{' '}
            <a href='https://www.joshwcomeau.com/css/anchor-positioning/'>
              joshwcomeau.com
            </a>
          </p>
        </hgroup>
      }
    >
      <div className='Target'>Target</div>
      <button
        className='Anchor'
        onClick={() => {
          setTargetOpen(true);
        }}
      >
        Anchor
      </button>
    </DemoPage>
  );
}
