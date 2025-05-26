import "./App.css";
import Icons from "./components/icons";
import ValueContainer from "./components/value-container";
import ButtonsContainer from "./components/buttons-container";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const handleDecrement = () => {
    setCount((count) => count - 1);
  };

  return (
    <>
      <Icons />
      <ValueContainer count={count} />
      <ButtonsContainer
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </>
  );
}

export default App;
