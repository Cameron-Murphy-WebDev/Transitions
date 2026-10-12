import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import './MarkdownNote.scss';

// Renders a Markdown string inside a bordered note box, so a pasted doc can be
// dropped in as a .md file (imported with `?raw`) instead of hand-converted to
// JSX.
//
// `headingOffset` pushes every heading down that many levels. A doc usually
// opens with its own `#`, but on a page that already has an h1 and a section
// h2 the doc's headings need to sit below them. Levels past h6 clamp to h6.
export default function MarkdownNote({
  headingOffset = 0,
  className = '',
  children,
}) {
  const headings = Object.fromEntries(
    [1, 2, 3, 4, 5, 6].map((level) => {
      const Tag = `h${Math.min(level + headingOffset, 6)}`;
      // eslint-disable-next-line no-unused-vars
      return [`h${level}`, ({ node, ...props }) => <Tag {...props} />];
    }),
  );

  return (
    <div className={`MarkdownNote ${className}`}>
      <Markdown components={headings}>{children}</Markdown>
    </div>
  );
}

MarkdownNote.propTypes = {
  headingOffset: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.string,
};
