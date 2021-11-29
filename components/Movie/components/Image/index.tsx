import React, { memo } from 'react';
import style from './style.module.scss';

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

export default memo(Image);
