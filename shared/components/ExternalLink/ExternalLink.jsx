import React from 'react';
import PropTypes from 'prop-types';
import './ExternalLink.scss';

// One credit line for anything that came from off the site, so every page
// words and styles its sources the same way.
//
// Default reads "From: <label>" and needs an `href`. `image` switches it to a
// smaller "Image From <label>" caption for crediting a picture, where the link
// is optional — without `href` it renders as plain text.
export default function ExternalLink({
  label,
  href,
  image = false,
  className = '',
}) {
  const text = image ? `Image From ${label}` : `From: ${label}`;
  const classes = `ExternalLink ${image ? 'Image' : ''} ${className}`;

  if (!href) {
    return <span className={classes}>{text}</span>;
  }

  return (
    <a className={classes} href={href} target='_blank' rel='noreferrer'>
      {text}
    </a>
  );
}

ExternalLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: (props, propName) => {
    if (!props.image && !props[propName]) {
      return new Error('ExternalLink: `href` is required unless `image` is set.');
    }
    return null;
  },
  image: PropTypes.bool,
  className: PropTypes.string,
};
