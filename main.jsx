import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import './sass/home.scss';

function Home() {
  return (
    <div className='Home'>
      <h1>Demos</h1>
      {/* Add a line per demo folder. Folder name = URL path. */}
      <ul>
        <li>
          <a href='/demos/carouselDemo/'>
            <h2 className='LinkText'>Slide/Fade with Cards</h2>
          </a>
        </li>
        <li>
          <a href='/colors/'>
            <h2>Color preview</h2>
          </a>
        </li>
      </ul>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <Home />
  </Wrapper>,
);
