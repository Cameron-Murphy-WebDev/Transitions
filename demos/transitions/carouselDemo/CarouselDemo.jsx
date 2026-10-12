import React from 'react';
import Carousel from '@shared/components/Carousel';
import CodeSample from '@shared/components/CodeSample';
import DemoPage from '@shared/components/DemoPage';
import DemoSlide from '@shared/components/DemoSlide';
import ButtonIcon from '@shared/images/Chevron.svg?react';
// `?raw` hands back the file's text, so saving Carousel.jsx updates the panel
// beside the demo. `region` narrows it to one marked block in that file.
import carouselSource from '@shared/components/Carousel/Carousel.jsx?raw';
import carouselStyles from '@shared/components/Carousel/Carousel.scss?raw';
import { overviewSlides, fadeSlides } from './content/slideContent';
import MarkdownNote from '@shared/components/MarkdownNote';
import refNotes from './content/refNotes.md?raw';
import './CarouselDemo.scss';

const slideCards = overviewSlides.map((slide) => (
  <DemoSlide key={slide.first} {...slide} />
));
const fadeCards = fadeSlides.map((slide) => (
  <DemoSlide key={slide.first} {...slide} />
));

export default function CarouselDemo() {
  return (
    <DemoPage title='Carousel' className='CarouselDemo'>
      <Carousel
        className='Half CarouselDemo-Wide'
        transClass='Slide'
        items={slideCards}
        ButtonIcon={ButtonIcon}
        transTime={2000}
      />
      <CodeSample
        className='Half Sample-Half'
        code={carouselStyles}
        label='Carousel.scss'
        lang='scss'
        region='slide'
      />
      <Carousel
        className='Half CarouselDemo-Wide'
        transClass='Fade'
        items={fadeCards}
        ButtonIcon={ButtonIcon}
        transTime={2000}
      />
      <CodeSample
        className='Half Sample-Half'
        code={carouselStyles}
        label='Carousel.scss'
        lang='scss'
        region='fade'
      />
      <CodeSample
        className='Full ChangeItems'
        code={carouselSource}
        label='Carousel.jsx'
        region='changing items'
      />
      <CodeSample
        className='Full'
        code={carouselSource}
        label='Carousel.jsx'
        region='carousel'
      />
      <MarkdownNote className='Full'>{refNotes}</MarkdownNote>
    </DemoPage>
  );
}
