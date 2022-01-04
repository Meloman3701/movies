import React, { memo, MouseEvent, useCallback, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import style from './style.module.scss';

interface Props {
  background: string;
  dragging: boolean;
  onClick?: () => void;
}

const Image: React.FC<Props> = ({ background, dragging, onClick }) => {
  const [styles, animate] = useSpring(() => ({
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    borderRadius: '200px',
    zIndex: 0
  }));

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) return;

    if (e.target instanceof HTMLDivElement) {
      const box = e.target.getBoundingClientRect();

      animate({
        from: {
          width: box.width + 'px',
          height: box.height + 'px',
        },
        to: {
          x: -box.x,
          y: -box.y,
          width: window.innerWidth + 'px',
          height: window.innerHeight + 'px',
          borderRadius: '0px',
          zIndex: 1
        }
      });
    }
    
    onClick();
  }

  return (
    <div className={style.imageContainer}>
      <animated.div
        className={style.image}
        style={{
          backgroundImage: `url("${background}")`,
          ...styles
        }}
        onClick={onClickHandler}
      />
    </div>
  )
}

export default memo(Image);
