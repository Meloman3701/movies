import React, { memo,  KeyboardEvent, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import style from './style.module.scss';

interface Props {
  background: string;
  dragging: boolean;
  onClick?: () => void;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

const Image: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>();

  const [styles, animate] = useSpring(() => ({
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    borderRadius: '200px',
  }));

  const openModal = () => {
    const box = ref.current.getBoundingClientRect();

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
      },
      onStart: props.onOpenModal
    });
  }

  const closeModal = () => {
    const box = ref.current.getBoundingClientRect();

    animate({
      x: 0,
      y: 0,
      width: box.width + 'px',
      height: box.height + 'px',
      borderRadius: '200px',
      onRest: props.onCloseModal
    });
  }

  const onClickHandler = () => {
    if (props.dragging) return;

    openModal();
    props.onClick();
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Escape') {
      closeModal();
    }
  }

  return (
    <div className={style.imageContainer} tabIndex={0} onKeyDown={onKeyDownHandler} ref={ref}>
      <animated.div
        className={style.image}
        style={{
          backgroundImage: `url("${props.background}")`,
          ...styles
        }}
        onClick={onClickHandler}
      />
    </div>
  )
}

export default memo(Image);
