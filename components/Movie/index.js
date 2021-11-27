import React, { memo, useEffect } from 'react';
import style from './style.module.css';
import Image from './components/Image';
import { useSpring, animated } from 'react-spring';

const Movie = ({ index, active, onClick, title, background }) => {
  const [{ y }, animate] = useSpring(() => ({
    y: 0
  }));

  useEffect(() => {
    animate({ y: active ? -50 : 0 })
  }, [active]);

  const onClickHandler = () => {
    onClick(index);
  }

  return (
    <div className={style.item}>
      <animated.div onClick={onClickHandler} className={style.container} style={{ y }}>
        <Image background={background}/>
        <div className={style.title}>{title}</div>
      </animated.div>
    </div>
  )
}

export default memo(Movie);
