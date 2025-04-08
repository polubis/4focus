import type React from "react";
import { useState } from "react";

interface CounterProps {
  initialCount?: number;
  label?: string;
}

const Counter: React.FC<CounterProps> = ({
  initialCount = 0,
  label = "Counter",
}) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white max-w-xs text-center">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <p className="text-3xl font-bold mb-4">{count}</p>
      <div className="flex justify-center space-x-2">
        <button
          type="button"
          onClick={decrement}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          - Decrement
        </button>
        <button
          type="button"
          onClick={increment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          + Increment
        </button>
      </div>
    </div>
  );
};

export { Counter };
