import Video from 'components/Video';
import React, { memo, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Container from 'components/Grid/Container';
import { useRouter } from 'next/router';
import { MovieType } from 'types';
import { getMovieByUri } from 'helpers/movies_helper';

const MovieDetail = () => {
  const router = useRouter();
  const { uri } = router.query;
  const [details, setDetails] = useState<MovieType>();

  useEffect(() => {
    if (typeof uri == 'string') {
      const movie = getMovieByUri(uri);
      setDetails(movie);
    }
  }, [uri]);

  return (
    <div className={styles.page}>
      <Container>
        <Video url={details?.trailer} />
      </Container>
    </div>
  )
}

export default memo(MovieDetail);
