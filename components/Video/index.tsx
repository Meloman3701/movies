import React, { memo, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './style.module.scss';

interface Props {
  url: string;
}

const Video: React.FC<Props> = props => {
  const [playing, setPlaying] = useState(false);
  const { width, height } = useSpring({
    from: {
      width: '0%',
      height: '0.5%'
    },
    to: async (next) => {
      await next({ width: '100%' });
      await next({ height: '100%' });
    }
  });

  const onClickPlay = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  return (
    <div className={styles.container}>
      <div>
        <animated.div className={styles.video} onClick={onClickPlay} style={{ width, height }}>

        </animated.div>
      </div>
    </div>
  )
}

export default memo(Video);
