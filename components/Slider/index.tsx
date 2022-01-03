import React, { memo, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from 'react-spring';
import _ from 'lodash';

interface Props {
  onChange: (item: number) => void;
  countItems: number;
  className: string;
  children: ({ set: setFunction }) => React.ReactElement[];
}

type setFunction = (item: number) => void;

const Slider: React.FC<Props> = props => {
  const sliderRef = useRef<HTMLDivElement>();
  const dragging = useRef(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [styles, animate] = useSpring(() => ({ x: 0 }));

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      props.countItems && setItemWidth(sliderRef.current.offsetWidth / props.countItems);
    })

    resizeObserver.observe(sliderRef.current)

    return () => resizeObserver.unobserve(sliderRef.current);
  }, [props.countItems]);

  const bind = useDrag(({ down, offset: [x], movement: [mx], velocity: [vx], direction: [dx] }) => {
    let currentItem = Math.round(x / itemWidth) * -1;
    
    if (!down && vx > .2 && inRange(currentItem - dx)) {
      currentItem -= dx;
    }

    if (Math.abs(mx) > 5) {
      dragging.current = true;
    }

    animate({ x: down ? x : (currentItem * -1) * itemWidth })
    inRange(currentItem) && props.onChange(currentItem);
  }, {
    bounds: {
      left: -itemWidth * (props.countItems - 1),
      right: 0
    },
    rubberband: true,
    from: () => [styles.x.get(), 0]
  });

  const set: setFunction = (item) => {
    if (!dragging.current) {
      animate({ x: item * itemWidth * -1 });
      props.onChange(item);
    }

    dragging.current = false;
  }

  const inRange = (index: number): boolean => index >= 0 && index < props.countItems;

  return (
    <animated.div
      ref={sliderRef}
      className={`${style.slider} ${props.className}`}
      style={{ ...styles }}
      {...bind()}
    >
      {props.children({ set })}
    </animated.div>
  )
}

export default memo(Slider);
