import React from 'react';
import './Diagrams.scss';

// Side-by-side data flow for the two carousels. Inline SVG rather than an image
// so the colours come from the same tokens as the rest of the page and the text
// stays selectable.
//
// A marker paints in its own context rather than inheriting the stroke of the
// path referencing it, so each arrow colour needs its own marker, and ids have
// to be unique across the whole document.
export function FlowDiagrams() {
  return (
    <div className='Diagrams Full'>
      <figure className='Diagram'>
        <figcaption>Coupled — buttons inside</figcaption>
        <svg
          viewBox='0 0 340 250'
          role='img'
          aria-label='Coupled carousel data flow: navigation buttons and drag both call changeItem inside the carousel, which sets its own state.'
        >
          <defs>
            <marker
              id='coupledArrow'
              viewBox='0 0 10 10'
              refX='9'
              refY='5'
              markerWidth='6'
              markerHeight='6'
              orient='auto-start-reverse'
            >
              <path className='Diagram-Head' d='M 0 0 L 10 5 L 0 10 z' />
            </marker>
          </defs>

          <rect
            className='Diagram-Outer'
            x='6'
            y='20'
            width='328'
            height='222'
            rx='8'
          />
          <text className='Diagram-Title' x='16' y='14'>
            Carousel
          </text>

          <rect
            className='Diagram-Box'
            x='26'
            y='40'
            width='130'
            height='42'
            rx='6'
          />
          <text className='Diagram-Text' x='91' y='66'>
            Navigation
          </text>

          <rect
            className='Diagram-Box'
            x='184'
            y='40'
            width='130'
            height='42'
            rx='6'
          />
          <text className='Diagram-Text' x='249' y='66'>
            drag
          </text>

          <rect
            className='Diagram-Box Accent'
            x='95'
            y='120'
            width='150'
            height='38'
            rx='6'
          />
          <text className='Diagram-Text' x='170' y='144'>
            changeItem()
          </text>

          <rect
            className='Diagram-Box'
            x='60'
            y='192'
            width='220'
            height='38'
            rx='6'
          />
          <text className='Diagram-Text Small' x='170' y='216'>
            active · forward · transitioning
          </text>

          <path
            className='Diagram-Line'
            markerEnd='url(#coupledArrow)'
            d='M 91 82 L 91 101 L 135 101 L 135 116'
          />
          <path
            className='Diagram-Line'
            markerEnd='url(#coupledArrow)'
            d='M 249 82 L 249 101 L 205 101 L 205 116'
          />
          <path
            className='Diagram-Line'
            markerEnd='url(#coupledArrow)'
            d='M 170 158 L 170 188'
          />
        </svg>
        <p>
          Nothing crosses a boundary. The buttons call <code>changeItem</code>{' '}
          directly and read <code>active</code> off the same state, so the
          carousel can only ever have the navigation it ships with.
        </p>
      </figure>

      <figure className='Diagram'>
        <figcaption>Decoupled — buttons outside</figcaption>
        <svg
          viewBox='0 0 340 250'
          role='img'
          aria-label='Decoupled carousel data flow: the caller sends a requested index down, the carousel resolves it through changeItem and sends the settled index back up through onChange.'
        >
          <defs>
            <marker
              id='decoupledArrow'
              viewBox='0 0 10 10'
              refX='9'
              refY='5'
              markerWidth='6'
              markerHeight='6'
              orient='auto-start-reverse'
            >
              <path className='Diagram-Head' d='M 0 0 L 10 5 L 0 10 z' />
            </marker>
            <marker
              id='decoupledArrowReturn'
              viewBox='0 0 10 10'
              refX='9'
              refY='5'
              markerWidth='6'
              markerHeight='6'
              orient='auto-start-reverse'
            >
              <path
                className='Diagram-Head Return'
                d='M 0 0 L 10 5 L 0 10 z'
              />
            </marker>
          </defs>

          <rect
            className='Diagram-Outer'
            x='6'
            y='20'
            width='328'
            height='62'
            rx='8'
          />
          <text className='Diagram-Title' x='16' y='14'>
            Caller
          </text>
          <text className='Diagram-Text' x='170' y='46'>
            Navigation — any UI
          </text>
          <text className='Diagram-Text Small' x='170' y='68'>
            holds the request, mirrors the result
          </text>

          <path
            className='Diagram-Line'
            markerEnd='url(#decoupledArrow)'
            d='M 95 82 L 95 146'
          />
          <text className='Diagram-Text Small Anchor' x='103' y='118'>
            requested
          </text>

          <path
            className='Diagram-Line Return'
            markerEnd='url(#decoupledArrowReturn)'
            d='M 245 148 L 245 84'
          />
          <text className='Diagram-Text Small End' x='237' y='118'>
            onChange
          </text>

          <rect
            className='Diagram-Outer'
            x='6'
            y='150'
            width='328'
            height='92'
            rx='8'
          />
          <text className='Diagram-Title' x='16' y='144'>
            Carousel
          </text>

          <rect
            className='Diagram-Box Accent'
            x='26'
            y='162'
            width='140'
            height='34'
            rx='6'
          />
          <text className='Diagram-Text' x='96' y='184'>
            changeItem()
          </text>

          <rect
            className='Diagram-Box'
            x='214'
            y='162'
            width='100'
            height='34'
            rx='6'
          />
          <text className='Diagram-Text' x='264' y='184'>
            drag
          </text>

          <path
            className='Diagram-Line'
            markerEnd='url(#decoupledArrow)'
            d='M 212 179 L 170 179'
          />

          <rect
            className='Diagram-Box'
            x='60'
            y='208'
            width='220'
            height='28'
            rx='6'
          />
          <text className='Diagram-Text Small' x='170' y='226'>
            active · forward · transitioning
          </text>

          <path
            className='Diagram-Line'
            markerEnd='url(#decoupledArrow)'
            d='M 96 196 L 96 206'
          />
        </svg>
        <p>
          Two one-way channels. A request goes down as a plain index and drag
          never leaves — both resolve through <code>changeItem</code>, so the
          wrap, the direction flag and the lock stay inside. What comes back is
          the index the carousel settled on, not the one that was asked for.
        </p>
      </figure>
    </div>
  );
}
