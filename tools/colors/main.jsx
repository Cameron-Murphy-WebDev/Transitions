import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import ColorPreview from './ColorPreview';

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <ColorPreview />
  </Wrapper>,
);
