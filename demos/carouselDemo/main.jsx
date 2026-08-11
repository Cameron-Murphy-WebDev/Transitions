import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import CardDemo from './Card';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <CardDemo />
  </Wrapper>,
);
