import React from 'react';
import PropTypes from 'prop-types';
import './DemoPage.scss';

// The chrome every demo shares: its heading and the two-column grid the demo's
// pieces sit in. A demo file is then only its own content.
//
// Children place themselves in the grid with the `Half` and `Full` classes —
// one column or the whole row. Both collapse to a single column at the
// breakpoint, so a demo never has to repeat that media query.
// `title` is the common case and gets wrapped in the h1 for you. `heading`
// takes that over when a page needs markup there — a subtitle, a link, an
// element to anchor against — and is rendered as given, so it brings its own
// heading tag and its own placement class. Passing both ignores `title`.
export default function DemoPage({ title, heading, className = '', children }) {
  return (
    <div className={`DemoPage ${className}`}>
      {/* Omit both and the heading goes with them — the home page names itself
          in the header, so a second one on the page is a repeat. */}
      {heading || (title && <h1 className='Full'>{title}</h1>)}
      {children}
    </div>
  );
}

DemoPage.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};
