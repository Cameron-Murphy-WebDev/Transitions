import React from 'react';
import DemoNotes from '@shared/components/DemoNotes';

// Prose blocks for the demo page, one export per topic. Kept out of
// CarouselDemo.jsx so the page file stays layout rather than copy.
export function RefNotes() {
  return (
    <DemoNotes className='Full'>
      <p>
        Newer versions of React do not allow <code>findDOMNode</code>, which has
        traditionally been used by <code>CSSTransition</code>. The newer method
        is to use refs and the <code>nodeRef</code> prop in{' '}
        <code>CSSTransition</code> instead.
      </p>
      <p>
        <code>
          {
            'const refs = useMemo(() => items.map(() => ({ current: null })), [items]);'
          }
        </code>{' '}
        creates these null refs, one <code>{'{ current: null }'}</code> for each
        item. When the item wrapper is created the corresponding ref is filled
        at its proper index and passes the object to <code>CSSTransition</code>{' '}
        as <code>nodeRef</code>. <code>useMemo</code> is used rather than a{' '}
        <code>useRef</code> per item because hooks cannot be called inside
        loops, which counts <code>useRef</code> out — and a ref does not have to
        come from <code>useRef</code>, it is just an object with a{' '}
        <code>current</code> property.
      </p>
      <p>
        An alternative would be to use a function that creates the wrapper divs
        based on the number of items received, each holding their own ref that
        is not part of any <code>refs</code> array. Either one avoids the issue
        of anything reading <code>ref.current</code> during render, which would
        return <code>null</code>.
      </p>
      <p>
        These both fix the issues with the pattern of using a single{' '}
        <code>CSSTransition</code> on a wrapper that holds a number of items. In
        that pattern the wrapper receives the <code>CSSTransition</code> classes
        and its items transition based on these class changes. The issue is that
        this seriously limits what <code>CSSTransition</code> can do — using the{' '}
        <code>unmountOnExit</code> prop, for example — and it needs much more
        code while being able to do less, since the wrapper will technically
        have incorrect <code>CSSTransition</code> classes.
      </p>
    </DemoNotes>
  );
}
