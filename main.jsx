import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import DemoPage from '@shared/components/DemoPage';
import './sass/home.scss';

// Section heading for each group folder in vite.config.js. The page list itself
// comes from that config, so a new page folder shows up here on its own.
const GROUP_LABELS = {
  'demos/transitions': 'Transitions',
  'demos/css': 'CSS',
  docs: 'Docs',
  tools: 'Tools',
};

const groups = Object.entries(GROUP_LABELS).map(([group, label]) => ({
  label,
  pages: __PAGES__.filter((page) => page.group === group),
}));

function Home() {
  return (
    <DemoPage className='Home'>
      {groups.map(({ label, pages }) => (
        <React.Fragment key={label}>
          <h2 className='Full'>{label}</h2>
          <ul className='Full'>
            {pages.map(({ path, name }) => (
              <li key={path}>
                <a href={`/${path}/`}>
                  <h2 className='LinkText'>{name}</h2>
                </a>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </DemoPage>
  );
}

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <Home />
  </Wrapper>,
);
