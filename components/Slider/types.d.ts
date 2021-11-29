
export type setFunction = (item: number) => void;

interface SliderProps {
  onChange: (item: number) => void;
  className: string;
  countItems: number;
  children: (obj: { set: setFunction }) => React.ReactElement<MovieProps>[];
}

export default SliderProps;
