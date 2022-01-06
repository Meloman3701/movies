import React, { memo, useState } from 'react';
import style from './style.module.scss';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from 'react-spring';
import { ResizeObserver } from '@juggle/resize-observer';
import useMeasure from 'react-use-measure';
import _ from 'lodash';

interface Props {
  onChange: (item: number) => void;
  countItems: number;
  className: string;
  children: ({ set: setFunction, dragging: boolean }) => React.ReactElement[];
}

type setFunction = (item: number) => void;

const Slider: React.FC<Props> = props => {
  const [dragging, setDragging] = useState(false);
  const [ref, sliderElement] = useMeasure({ polyfill: ResizeObserver })
  const [styles, animate] = useSpring(() => ({ x: 0 }));

  const itemWidth = sliderElement.width / props.countItems;

  const bind = useGesture({
    onDrag: ({ down, active, offset: [x], movement: [mx], velocity: [vx], direction: [dx] }) => {
      let currentItem = Math.round(x / itemWidth) * -1;
    
      if (!down && vx > .2 && inRange(currentItem - dx)) {
        currentItem -= dx;
      }

      if (Math.abs(mx) > 5) {
        setDragging(true);
      }

      animate({ x: down ? x : (currentItem * -1) * itemWidth, immediate: name => active && name == 'x' })
      inRange(currentItem) && props.onChange(currentItem);
    },
    onWheel: ({ offset: [x, y] }) => {
      let currentItem = Math.round(-y / itemWidth) * -1;

      if (inRange(currentItem)) {
        animate({ x:  (currentItem * -1) * itemWidth })
        props.onChange(currentItem);
      }
    }
  }, {
    drag: {
      bounds: {
        left: -itemWidth * (props.countItems - 1),
        right: 0
      },
      rubberband: true,
      from: () => [styles.x.get(), 0]
    },
    wheel: {
      from: () => [0, -styles.x.get()]
    }
  });

  const set: setFunction = (item) => {
    if (dragging) return;

    animate({ x: item * itemWidth * -1 });
    props.onChange(item);
  }

  const inRange = (index: number): boolean => index >= 0 && index < props.countItems;

  const stopDragging = () => setDragging(false);

  return (
    <animated.div
      ref={ref}
      onClick={stopDragging}
      onTouchEnd={stopDragging}
      className={`${style.slider} ${props.className}`}
      style={{ ...styles }}
      {...bind()}
    >
      {props.children({ set, dragging })}
    </animated.div>
  )
}

export default memo(Slider);
