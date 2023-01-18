import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("0");

  const calcBtns = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "%"].map((a) => (
    <button
      onClick={(a) => {
        setData(data + a.target.value);
      }}
      // onClick={updateCalc(a)}
      value={a}
      key={a}
      className="border border-black mx-1 p-[15px_10px]"
    >
      {a}
    </button>
  ));
  const opsBtns = ["+", "-", "/", "*"].map((a) => (
    <button
      value={a}
      key={a}
      className="border border-black mx-1 p-[15px_10px]"
    >
      {a}
    </button>
  ));

  return (
    <div className="">
      <div></div>
      {data}
      <div className="flex">
        <div className="grid grid-cols-3">{calcBtns}</div>
        <div className="grid grid-cols-1">{opsBtns}</div>
        <button
          className="border border-black p-2"
          onClick={() => setData(data.slice(0, data.length - 1))}
        >
          Backspace
        </button>
        <button className="border border-black p-2" onClick={() => setData("")}>
          AC
        </button>
      </div>
    </div>
  );
}

export default App;
