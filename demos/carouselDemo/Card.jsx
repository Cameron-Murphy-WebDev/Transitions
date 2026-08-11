import React from 'react';
import Carousel from '@shared/components/carousel';
import ButtonIcon from '@shared/images/Chevron.svg?react';
import './Card.scss';

function Card(index, transType) {
  return (
    <div className='card'>
      <h2>{`${transType} ${index}`}</h2>
    </div>
  );
}

let slideCards = [];
let fadeCards = [];

for (let index = 0; index < 3; index++) {
  slideCards[index] = Card(index + 1, 'Slide');
  fadeCards[index] = Card(index + 1, 'Fade');
}

export default function CardDemo() {
  return (
    <>
      <h1>Carousel</h1>
      <Carousel
        className=''
        transClass='Slide'
        items={slideCards}
        ButtonIcon={ButtonIcon}
      />
      <Carousel
        className=''
        transClass='Fade'
        items={fadeCards}
        ButtonIcon={ButtonIcon}
      />
    </>
  );
}
