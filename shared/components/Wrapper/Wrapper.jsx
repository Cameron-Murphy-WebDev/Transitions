import React from 'react';
import PropTypes from 'prop-types';
import '@sass/baseStyles.scss';
import Header from '../Header';

// Owns the chrome every page shares. Page content arrives as children.
export default function Wrapper({ children }) {
  return (
    <>
      <Header />
      <main id='main_content'>{children}</main>
    </>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
};
