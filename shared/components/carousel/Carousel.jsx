import React, { useState, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDragItem } from '@shared/hooks/useDragItem';
import PropTypes from 'prop-types';
import './Carousel.scss';

export default function Carousel({
  className,
  threshold,
  transClass,
  items,
  ButtonIcon,
  transTime,
}) {
  // #region state
  const contentCount = items.length - 1;
  const refs = useMemo(() => items.map(() => ({ current: null })), [items]);
  const [forward, setForward] = useState(null);
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false); //so buttons aren't spammable
  const drag = useDragItem(threshold);
  const dragDisabled = useRef(false);
  // #endregion state

  const dragHandler = (event) => {
    event.type === 'mousedown' && (dragDisabled.current = false);
    if (dragDisabled.current) return;
    const changed = drag(event);
    event.type === 'mouseleave' && (dragDisabled.current = true); //make sure user has clicked again if mouseleave. If set to true and dev changes to touch will look bugged
    changed && changeItem(active - changed);
  };

  // #region changing items
  function changeItem(index) {
    if (transitioning) return;
    setTransitioning(true);
    const newActive =
      index <= contentCount && index >= 0
        ? index
        : index > active
          ? 0
          : contentCount;

    setForward(index > active);
    setActive(newActive);
  }
  // #endregion changing items

  return (
    <div className={`Carousel-Container ${className}`}>
      {/* #region carousel */}
      <div className='Carousel'>
        {items.map((item, index) => {
          return (
            <CSSTransition
              classNames={transClass}
              timeout={transTime}
              in={active === index}
              onEntered={() => setTransitioning(false)}
              nodeRef={refs[index]}
              key={index}
              onTouchStart={dragHandler}
              onTouchMove={dragHandler}
              onTouchEnd={dragHandler}
              onMouseDown={dragHandler}
              onMouseMove={dragHandler}
              onMouseUp={dragHandler}
              onMouseLeave={dragHandler}
            >
              <div
                className={`Carousel-Item ${forward ? 'Forward' : ''} ${
                  active === index ? 'Active' : ''
                }`}
                style={{ '--transTime': `${transTime}ms` }}
                ref={refs[index]}
              >
                {item}
              </div>
            </CSSTransition>
          );
        })}
      </div>
      {/* #endregion carousel */}
      {items?.length > 1 && (
        <div className='Navigation'>
          <div className='Navigation-Bar'>
            {items.map((item, index) => {
              return (
                <button
                  key={index}
                  title={`Slide ${index + 1}`}
                  className={active === index ? 'Active' : ''}
                  disabled={active === index}
                  onClick={() => {
                    changeItem(index);
                  }}
                />
              );
            })}
          </div>
          <button
            className='Button-Left'
            title='previous'
            onClick={() => {
              changeItem(active - 1);
            }}
          >
            <ButtonIcon />
          </button>
          <button
            className='Button-Right'
            title='next'
            onClick={() => {
              changeItem(active + 1);
            }}
          >
            <ButtonIcon />
          </button>
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  className: PropTypes.string,
  threshold: PropTypes.number,
  transClass: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.element),
  ButtonIcon: PropTypes.elementType,
  transTime: PropTypes.number,
};
