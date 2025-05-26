import type { FC } from "react";

interface IProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

const ButtonsContainer: FC<IProps> = ({ onIncrement, onDecrement }) => {
  return (
    <div className="card">
      <button onClick={onIncrement}>Увеличить число</button>
      <button onClick={onDecrement}>Уменьшить число</button>
    </div>
  );
};

export default ButtonsContainer;
