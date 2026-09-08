import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDragItem } from '@shared/hooks/useDragItem';
import PropTypes from 'prop-types';
import './Carousel.scss';

const timeOut = 600;

export default function Carousel({
  className,
  threshold,
  transClass,
  items,
  requested,
  onChange,
}) {
  // #region state
  const contentCount = items.length - 1;
  const refs = useMemo(() => items.map(() => ({ current: null })), [items]);
  const [active, setActive] = useState(0);
  const [forward, setForward] = useState(null);
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

  useEffect(() => {
    requested !== active && changeItem(requested);
  }, [requested]);

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
    onChange(newActive);
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
              timeout={timeOut}
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
                ref={refs[index]}
              >
                <h2>{`Requested: ${requested}`}</h2>
                {item}
              </div>
            </CSSTransition>
          );
        })}
      </div>
      {/* #endregion carousel */}
    </div>
  );
}

Carousel.propTypes = {
  className: PropTypes.string,
  threshold: PropTypes.number,
  transClass: PropTypes.string,
  requested: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.element),
  onChange: PropTypes.func,
};
