import React, { memo, useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from 'react-spring';

const Slider = ({ children, onChange, className, countItems }) => {
  const sliderRef = useRef();
  const dragging = useRef(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [styles, animate] = useSpring(() => ({
    x: 0
  }));

  useEffect(() => {
    setItemWidth(sliderRef.current.offsetWidth / countItems);
  }, [countItems]);

  const bind = useDrag(({ down, offset: [x], movement: [mx] }) => {
    if (Math.abs(mx) > itemWidth / 4) {
      dragging.current = true;
    }

    let currentItem = Math.round(x / itemWidth);
    animate({ x: down ? x : currentItem * itemWidth });
    onChange(Math.abs(currentItem));
  }, {
    bounds: {
      left: -itemWidth * (countItems - 1),
      right: 0
    },
    rubberband: true,
    from: () => [styles.x.get(), 0]
  });

  const set = (item) => {
    if (!dragging.current) {
      animate({ x: item * itemWidth * -1 });
      onChange(item);
    }

    dragging.current = false;
  }

  return (
    <animated.div
      ref={sliderRef}
      className={`${style.slider} ${className}`}
      style={{ ...styles }}
      {...bind()}
    >
      {children({ set })}
    </animated.div>
  )
}

export default memo(Slider);
