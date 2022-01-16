import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from './style.module.scss';
import { MovieType } from 'types';
import Background from 'components/Background';
import Slider from 'components/Slider';
import Movie from 'components/Movie';
import { getMovies } from 'helpers/movies_helper';

export default function Home() {
  const [active, setActive] = useState(0);
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const movies = getMovies();
    setMovies(movies);
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <title>Movies</title>
        <meta name="theme-color" content="#0d1a18" />
      </Head>

      {movies.length && movies[active] && (
        <Background url={movies[active].mainBackground} />
      )}

      <Slider onChange={setActive} className={styles.slider} countItems={movies.length}>
        {({ set, dragging }) => (
          movies.map((movie, index) => (
            <Movie
              key={movie.id}
              uri={movie.uri}
              active={active === index}
              index={index}
              title={movie.title}
              background={movie.background}
              onClick={set}
              dragging={dragging}
            />
          ))
        )}
      </Slider>
    </div>
  )
}
