import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import DemoPage from '@shared/components/DemoPage';
import './sass/home.scss';

function Home() {
  return (
    <DemoPage className='Home'>
      <h2 className='Full'>Transitions</h2>
      <ul className='Full'>
        <li>
          <a href='/demos/carouselDemo/'>
            <h2 className='LinkText'>Carousel</h2>
          </a>
        </li>
        <li>
          <a href='/demos/carouselDecoupled/'>
            <h2 className='LinkText'>Carousel Nav Decoupled</h2>
          </a>
        </li>
      </ul>
      <h2 className='Full'>CSS</h2>
      <ul className='Full'>
        <li>
          <a href='/css/anchor/'>
            <h2 className='LinkText'>Anchor</h2>
          </a>
        </li>
      </ul>
      <a href='/colors/'>
        <h2 className='LinkText'>Color preview</h2>
      </a>
    </DemoPage>
  );
}

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <Home />
  </Wrapper>,
);
