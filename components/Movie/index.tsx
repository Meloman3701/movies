import React, { memo, useEffect } from 'react';
import style from './style.module.scss';
import Image from './components/Image';
import { useSpring, animated } from 'react-spring';

interface Props {
  index: number;
  active: boolean;
  onClick: (index: number) => void;
  title: string;
  background: string;
}

const Movie: React.FC<Props> = props => {
  const [{ y }, animate] = useSpring(() => ({
    y: 0,
  }));

  useEffect(() => {
    animate({ y: props.active ? -50 : 0 });
  }, [props.active]);

  const onClickHandler = () => {
    props.onClick(props.index);
  };

  return (
    <div className={style.item}>
      <animated.div
        onClick={onClickHandler}
        className={style.container}
        style={{ y }}
      >
        <Image background={props.background} />
        <div className={style.title}>{props.title}</div>
      </animated.div>
    </div>
  );
};

export default memo(Movie);
