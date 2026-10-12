import React, { useState } from 'react';
import DemoPage from '@shared/components/DemoPage';
import './TransitionDemo.scss';

export default function TransitionDemo() {
  const [transform, setTransform] = useState(false);
  return (
    <DemoPage title='Transition' className='TransitionDemo'>
      <div className='Transition-Page Full'>
        <div className='Inner'>
          <div
            className={`Star${transform ? ' Transform' : ' Deform'}`}
            onMouseOver={() => {
              setTransform(true);
            }}
            onMouseLeave={() => {
              setTransform(false);
            }}
          ></div>
          <div className={`Outer Blue${transform ? ' Transform' : ''}`} />
          <div className={`Outer Red${transform ? ' Transform' : ''}`} />
        </div>
      </div>
    </DemoPage>
  );
}
