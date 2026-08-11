import { useRef, useCallback } from 'react';

export function useDragItem(threshold = 50) {
  const dragStartPosition = useRef(0);
  const dragPosition = useRef(0);

  return useCallback(
    (event) => {
      switch (event.type) {
        case 'touchstart':
          dragStartPosition.current = event.changedTouches[0].clientX;
          dragPosition.current = event.changedTouches[0].clientX;
          break;
        case 'mousedown':
          dragStartPosition.current = event.clientX;
          dragPosition.current = event.clientX;
          break;
        case 'touchmove':
          dragPosition.current = event.changedTouches[0].clientX;
          break;
        case 'mousemove':
          event.buttons !== 0 && (dragPosition.current = event.clientX);
          break;
        case 'mouseup':
        case 'mouseleave':
        case 'touchend':
          // See if user hit shift threshold
          if (
            Math.abs(dragPosition.current - dragStartPosition.current) >=
            threshold
          ) {
            const direction =
              dragPosition.current - dragStartPosition.current > 0 ? 1 : -1;
            // Reset values
            dragStartPosition.current = 0;
            dragPosition.current = 0;
            return direction;
          }
      }
      return 0;
    },
    [threshold],
  );
}
