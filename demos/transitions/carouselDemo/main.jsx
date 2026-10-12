import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import CarouselDemo from './CarouselDemo';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <CarouselDemo />
  </Wrapper>,
);
