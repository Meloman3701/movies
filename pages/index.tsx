import { useEffect, useState } from 'react';
import Head from 'next/head'
import moviesMock from 'public/movies.json';
import styles from 'styles/Home.module.scss';
import { MovieType } from 'types';
import Background from 'components/Background';
import Slider from 'components/Slider';
import Movie from 'components/Movie';

export default function Home() {
  const [active, setActive] = useState(0);
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    setMovies(moviesMock.items);
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {movies.length && movies[active] && (
        <Background url={movies[active].mainBackground} />
      )}

      <Slider onChange={setActive} className={styles.slider} countItems={movies.length}>
        {({ set, dragging }) => (
          movies.map((movie, index) => (
            <Movie
              key={movie.id}
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
