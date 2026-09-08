// The same copy the slide carousel runs on demos/carouselDemo, so the two pages
// show identical content and any difference on screen is the component's doing.
// Kept as its own file rather than imported across demos: this page exists to
// let the decoupled component drift from the original, and its content with it.
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
