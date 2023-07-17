import { MouseEventHandler } from 'react';
import './Square.css';

interface Props {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Square = ({ value, onClick }: Props) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
