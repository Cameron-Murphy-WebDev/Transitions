import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

// Add a line per page. Home lives on the logo, not here.
const links = [];

export default function Header({ className = '' }) {
  const current = window.location.pathname;

  return (
    <header className={`Header ${className}`}>
      <a className='Header-Logo' href='/'>
        Demos
      </a>
      <nav className='Header-Nav'>
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={link.url === current ? 'Active' : ''}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
