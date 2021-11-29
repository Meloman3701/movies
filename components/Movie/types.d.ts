interface MovieProps {
  index: number;
  active: boolean;
  onClick: (index: number) => void;
  title: string;
  background: string;
}

export default MovieProps;
