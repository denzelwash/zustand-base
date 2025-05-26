import type { FC } from "react";
import Value from "./value";

interface IProps {
  count: number;
}

const ValueContainer: FC<IProps> = ({ count }) => {
  return (
    <div>
      <h4>Число:</h4>
      <Value count={count} />
    </div>
  );
};

export default ValueContainer;
