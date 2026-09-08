import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import CarouselDecoupledDemo from './CarouselDecoupledDemo';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <CarouselDecoupledDemo />
  </Wrapper>,
);
