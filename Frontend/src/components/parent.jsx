import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router";
import Child from "./child";

function Parent() {
  console.log("Parent Component Render....");
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const displayCount = useCallback(() => {
    alert(`Count is ${countRef.current}`);
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-red-500">{count}</h1>

      <button
        onClick={handleIncrement}
        className="p-3 bg-blue-500 text-white font-semibold"
      >
        Count
      </button>

      <Child displayCount={displayCount} />
    </div>
  );
}

export default Parent;
