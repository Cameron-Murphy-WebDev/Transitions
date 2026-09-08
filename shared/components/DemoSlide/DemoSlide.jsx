import React from 'react';
import PropTypes from 'prop-types';
import Monogram from '@shared/images/Monogram.svg?react';
import './DemoSlide.scss';

// The card the carousel demos put in their slides. Shared because both demos
// show the same content — the point of comparison is the carousel around it,
// not the card, so any difference here would be noise.
export default function DemoSlide({ text, first, second, tone = '' }) {
  return (
    <div className={`DemoSlide ${tone}`}>
      <div className='DemoSlide-Head'>
        {/* No explicit colour — currentColor picks up whatever the slide's tone
            sets, so the mark flips with the background. */}
        <Monogram className='DemoSlide-Mark' />
        <p>{text}</p>
      </div>
      <div className='DemoSlide-Row'>
        <strong>{first}</strong>
      </div>
      <div className='DemoSlide-Row'>
        <strong>{second}</strong>
      </div>
    </div>
  );
}

DemoSlide.propTypes = {
  text: PropTypes.string,
  first: PropTypes.string,
  second: PropTypes.string,
  tone: PropTypes.string,
};
