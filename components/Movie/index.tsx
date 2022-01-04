import React, { memo, useEffect, useRef } from 'react';
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

  const ignoreClick = () => {
    lock.current = true;
  }

  return (
    <div className={style.item}>
      <animated.div
        onClick={onClickHandler}
        className={style.container}
        style={{ y }}
      >
        <Image background={props.background} dragging={props.dragging} onClick={ignoreClick} />
        <div className={style.title}>{props.title}</div>
      </animated.div>
    </div>
  );
};

export default memo(Movie);
