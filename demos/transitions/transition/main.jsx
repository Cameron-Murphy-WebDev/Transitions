import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import TransitionDemo from './TransitionDemo';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <TransitionDemo />
  </Wrapper>,
);
