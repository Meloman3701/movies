import React from 'react';
import style from './style.module.css';

const Image = ({ background }) => {
  return (
    <div
      className={style.image}
      style={{
        backgroundImage: `url("${background}")`,
      }}
    />
  )
}

export default Image;
