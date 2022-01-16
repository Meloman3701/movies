import React, { memo, useCallback, useState } from 'react';
import { useSpring, animated, useSpringRef, useChain } from 'react-spring';
import styles from './style.module.scss';

interface Props {
  url: string;
}

const Video: React.FC<Props> = props => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useSpringRef();
  const iframeRef = useSpringRef();
  const { width, height } = useSpring({
    ref: videoRef,
    from: {
      width: 0,
      height: 0.5
    },
    to: async (next) => {
      await next({ width: 100 });
      await next({ height: 100 });
    }
  });
  const { opacity } = useSpring({
    ref: iframeRef,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  useChain([videoRef, iframeRef], [0, 1]);

  const onClickPlay = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  return (
    <div className={styles.container2}>
      <div>
        <animated.div
          className={styles.video}
          onClick={onClickPlay}
          style={{
            width: width.to(v => v + '%'),
            height: height.to(v => v + '%')
          }}
        >
          <animated.iframe
            style={{ opacity }}
            width="100%"
            height="100%"
            src={props.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </animated.div>
      </div>
    </div>
  )
}

export default memo(Video);
