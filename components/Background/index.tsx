import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, FC, useRef } from 'react';
import style from './style.module.scss';

interface Props {
  url: string
}

type Image = string | ArrayBuffer;

const Background: FC<Props> = props => {
  const [images, setImages] = useState<[Image, Image]>(['','']);
  const requestController = useRef<AbortController>();

  const [{ y }, animate] = useSpring(() => ({
    y: 0
  }));

  useEffect(() => {
    const [first] = images;
    
    if (!props.url) {
      return;
    }

    const timer = setTimeout(() => {
      getDataUrl(props.url).then(dataUrl => {
        setImages([dataUrl, first]);
        animate.start({ from: { y: -50 }, to: { y: 0 }});
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [props.url]);

  const getDataUrl = (url: string): Promise<Image> => (
    new Promise(resolve => {
      requestController.current?.abort();
      requestController.current = new AbortController();
      const { signal } = requestController.current;
      fetch(url, { signal }).then(response => response.blob()).then(response => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(response);
        fileReader.onload = () => resolve(fileReader.result);
      })
    })
  )

  const [firstImage, secondImage] = images;

  return (
    <div className={style.background}>
      <animated.div
        className={style.nextImage}
        style={{ y, opacity: y.to([-50, 0], [0, 1]), backgroundImage: `url(${firstImage})` }}
      />
      <animated.div
        className={style.prevImage}
        style={{ backgroundImage: `url(${secondImage})` }}
      />
      <div className={style.opacity} />
    </div>
  )
}

export default Background;
