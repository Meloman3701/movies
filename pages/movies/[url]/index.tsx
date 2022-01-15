import Video from 'components/Video';
import React, { memo } from 'react';
import styles from './style.module.scss';
import Container from 'components/Grid/Container';

const MovieDetail = () => {
  return (
    <div className={styles.page}>
      <Container>
        <Video url="https://www.youtube.com/embed/by_rI-aNtp4" />
      </Container>
    </div>
  )
}

export default memo(MovieDetail);
