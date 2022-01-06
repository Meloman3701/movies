import Video from 'components/Video';
import React, { memo } from 'react';
import styles from 'styles/MoviesDetail.module.scss';

const MovieDetail = () => {
  return (
    <div className={styles.page}>
      <Video url="https://www.youtube.com/embed/by_rI-aNtp4" />
    </div>
  )
}

export default memo(MovieDetail);
