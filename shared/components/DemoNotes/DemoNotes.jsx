import React from 'react';
import PropTypes from 'prop-types';
import './DemoNotes.scss';

// Prose slot for a demo page. Borrows the code panel's border and padding so
// the two read as a pair rather than as unrelated blocks. Notes themselves live
// in each demo's content folder — this is only the box they sit in.
export default function DemoNotes({ className = '', children }) {
  return <div className={`DemoNotes ${className}`}>{children}</div>;
}

DemoNotes.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
