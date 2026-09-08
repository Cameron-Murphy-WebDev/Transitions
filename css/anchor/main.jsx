import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import AnchorDemo from './AnchorDemo';

// Wrapper is what puts the header on the page, and the header's wordmark is the
// way back to the index — without it this page is a dead end.
createRoot(document.getElementById('root')).render(
  <Wrapper>
    <AnchorDemo />
  </Wrapper>,
);
