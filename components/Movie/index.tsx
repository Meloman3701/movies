import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import Image from './components/Image';
import { useSpring, animated } from 'react-spring';

interface Props {
  index: number;
  active: boolean;
  title: string;
  background: string;
  dragging: boolean;
  onClick: (index: number) => void;
}

const Movie: React.FC<Props> = props => {
  const [open, setOpen] = useState(false);
  const lock = useRef(false);

  const [{ y }, animate] = useSpring(() => ({
    y: 0,
  }));

  useEffect(() => {
    animate({ y: props.active ? -50 : 0 });
  }, [props.active]);

  const onClickHandler = () => {
    !lock.current && props.onClick(props.index);
    lock.current = false;
  }

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const ignoreClick = useCallback(() => {
    lock.current = true;
  }, []);

  return (
    <div className={style.item} style={{ zIndex: open ? 1 : 0 }}>
      <animated.div
        onClick={onClickHandler}
        className={style.container}
        style={{ y }}
      >
        <Image
          background={props.background}
          dragging={props.dragging}
          onClick={ignoreClick}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
        />
        <div className={style.title}>{props.title}</div>
      </animated.div>
    </div>
  );
};

export default memo(Movie);
