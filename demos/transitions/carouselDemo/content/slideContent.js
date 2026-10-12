// Copy for the demo carousels. Kept out of CarouselDemo.jsx so the page file
// stays markup — each entry matches the props DemoSlide takes.
export const overviewSlides = [
  {
    text: 'One item shows at a time. The rest sit in the same grid cell, hidden until transition.',
    first: 'Slide transition',
    second: '600ms timeout',
    tone: 'Blue',
  },
  {
    text: 'refs builds one ref object per entry in the items prop, so every CSSTransition gets a stable nodeRef instead of falling back to findDOMNode.',
    first: 'useMemo keyed on items',
    second: 'Wrapper div holds the ref',
    tone: 'Red',
  },
  {
    text: 'Each item is wrapped in a div with its own CSSTransition, so the enter, exit and active classes only ever land on the items that are moving.',
    first: 'One CSSTransition per item',
    second: 'classNames sets the prefix',
    tone: 'Gold',
  },
];

export const fadeSlides = [
  {
    text: 'Fading items do not use order the way sliding ones do — they sit on top of each other in the same cell, so there is nothing to reorder.',
    first: 'Fade transition',
    second: 'No order needed',
    tone: 'Blue',
  },
  {
    text: 'The catch is that while one item fades out and the next fades in, both are partly transparent at once and mesh together.',
    first: 'Both visible mid-fade',
    second: 'Items mesh',
    tone: 'Red',
  },
  {
    text: 'SwitchTransition from react-transition-group solves this properly, but the simpler fix is a delay that offsets the two fades so they never overlap.',
    first: 'SwitchTransition',
    second: 'Or offset one fade',
    tone: 'Gold',
  },
];
