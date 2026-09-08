import React from 'react';
import DemoNotes from '@shared/components/DemoNotes';

// Prose blocks for the demo page, one export per topic. Kept out of
// CarouselDecoupledDemo.jsx so the page file stays layout rather than copy.
export function NavNotes() {
  return (
    <DemoNotes className='Full'>
      <p>
        In this version of the carousel the buttons are excluded and instead
        supplied by the caller. I don't want to have state or functions coupled
        so instead a <code>requested</code> prop was created.
      </p>
      <p>
        The caller sends a request, this is completely one way, the caller does
        not know how that request is handled. What comes back is a separate
        channel — <code>onChange</code> — so the caller learns which slide the
        carousel settled on without ever reaching into it.
      </p>
    </DemoNotes>
  );
}
