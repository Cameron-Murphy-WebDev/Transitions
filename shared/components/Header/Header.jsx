import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

// Add a line per page. Home lives on the logo, not here.
const links = [{ label: 'Color preview', url: '/colors/' }];

export default function Header({ className = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const current = window.location.pathname;

  return (
    <header className={`Header ${className} ${menuOpen ? 'Open' : ''}`}>
      <a className='Header-Logo' href='/'>
        Transitions
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
      <button
        className='Header-Toggle'
        type='button'
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
