import React, { memo, useEffect, useState } from 'react';

interface Props {
  url: string;
}

const Video: React.FC<Props> = props => {
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const width = window.innerWidth;
    const height = width * 9 / 21;
    setWindowSize([width, height])
  }, []);

  const [width, height] = windowSize;

  return (
    <div>
      <iframe
        width={width}
        height={height}
        src={props.url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default memo(Video);
