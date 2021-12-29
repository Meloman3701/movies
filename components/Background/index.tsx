import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, FC } from 'react';
import style from './style.module.scss';

interface Props {
  url: string
}

const Background: FC<Props> = props => {
  const [images, setImages] = useState<[string, string]>(['','']);

  const [{ y }, animate] = useSpring(() => ({
    y: 0
  }));

  useEffect(() => {
    const [first, second] = images;
    setImages([props.url, first]);
    animate.start({ from: { y: -50 }, to: { y: 0 }});
  }, [props.url]);

  return (
    <div className={style.background}>
      <animated.div
        className={style.nextImage}
        style={{ y, opacity: y.to([-50, 0], [0, 1]), backgroundImage: `url(${images[0]})` }}
      />
      <animated.div
        className={style.prevImage}
        style={{ backgroundImage: `url(${images[1]})` }}
      />
      <div className={style.opacity} />
    </div>
  )
}

export default Background;
