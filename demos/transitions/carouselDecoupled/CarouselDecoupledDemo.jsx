import React, { useState } from 'react';
import Carousel from '@shared/components/CarouselDecoupled';
import CodeSample from '@shared/components/CodeSample';
import DemoPage from '@shared/components/DemoPage';
import DemoSlide from '@shared/components/DemoSlide';
import ButtonIcon from '@shared/images/Chevron.svg?react';
// Hand-kept, not a live view of the file — it won't follow edits to
// Carousel.jsx the way a `?raw` import of the source itself does.
import changes from './content/changes.txt?raw';
import { overviewSlides } from './content/slideContent';
import { FlowDiagrams } from './content/Diagrams';
import MarkdownNote from '@shared/components/MarkdownNote';
import navNotes from './content/navNotes.md?raw';
import './CarouselDecoupledDemo.scss';

const slideCards = overviewSlides.map((slide) => (
  <DemoSlide key={slide.first} {...slide} />
));

export default function CarouselDecoupledDemo() {
  const [active, setActive] = useState(0);
  const [request, setRequest] = useState(0);

  return (
    <DemoPage title='Carousel Nav Decoupled' className='CarouselDecoupled'>
      <Carousel
        className='Half'
        transClass='Slide'
        items={slideCards}
        requested={active}
        onChange={setActive}
      />
      <Carousel
        className='Half'
        transClass='Fade'
        items={slideCards}
        requested={request}
        onChange={setActive}
      />

      {slideCards?.length > 1 && (
        <div className='Navigation Full'>
          <div className='Navigation-Bar'>
            {slideCards.map((item, index) => {
              return (
                <button
                  className={active == index ? 'Active' : ''}
                  key={index}
                  title={`Slide ${index + 1}`}
                  onClick={() => {
                    setRequest(index);
                  }}
                />
              );
            })}
          </div>
          <button
            className='Button-Left'
            title='previous'
            onClick={() => {
              setRequest(active - 1);
            }}
          >
            <ButtonIcon />
          </button>
          <button
            className='Button-Right'
            title='next'
            onClick={() => {
              setRequest(active + 1);
            }}
          >
            <ButtonIcon />
          </button>
        </div>
      )}

      <MarkdownNote className='Full'>{navNotes}</MarkdownNote>
      <FlowDiagrams />
      <CodeSample
        className='Full'
        code={changes}
        label='Carousel.jsx — changed from the coupled version'
      />
    </DemoPage>
  );
}
