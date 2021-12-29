import React, { memo } from 'react';
import style from './style.module.scss';

interface Props {
  background: string;
}

const Image: React.FC<Props> = props => {
  return (
    <div
      className={style.image}
      style={{
        backgroundImage: `url("${props.background}")`,
      }}
    />
  )
}

export default memo(Image);
