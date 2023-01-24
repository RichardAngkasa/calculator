import React, { useEffect, useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [temporary1, setTemporary1] = useState("");
  const [temporary2, setTemporary2] = useState(null);
  const [firsrOpt, setfirsrOpt] = useState("");
  const [equal, setEqual] = useState("");

  // akan berjalan setiap ada perubahan pada display.
  useEffect(() => {
    //jika ada operator maka jalankan ini, well tetapbisa jalan, cuma bakal barengan terus dengan temporary satu, makanya pas ada operator aja, bias efektif
    //fungsi untuk temporary 2
    if (
      !["+", "-", "*", "/"].map((a) => display.indexOf(a) !== -1).includes(true)
    ) {
      let test = [];
      for (let i of display) {
        if (!["+", "-", "*", "/"].includes(i)) {
          test.push(i);
        }
      }
      setTemporary1(test.join(""));
    } else {
      let test2 = [];
      for (let i of display.split("").reverse()) {
        if (!["+", "-", "*", "/"].includes(i)) {
          test2.push(i);
        } else {
          setfirsrOpt(i);
          break;
        }
      }
      setTemporary2(test2.reverse().join(""));
    } //Mengambil nilai dari display untuk temporary 1 menggunakan looping, berhenti ketika bertemu ketika operator
  }, [display]);

  //menfilter nilai display, isinya operator

  // for (let i of display.split("")) {
  //   if (["+", "-", "*", "/"].includes(i)) {
  //     flag.push(i);
  //   }
  // }
  // let flag = [];

  // console.log("flag:", flag);

  // let result = 0;
  // if (true) {
  //   switch (firsrOpt) {
  //     case "+":
  //       result = Number(temporary1) + Number(temporary2);
  //       break;
  //     case "-":
  //       result = Number(temporary1) - Number(temporary2);
  //       break;
  //     case "*":
  //       result = Number(temporary1) * Number(temporary2);
  //       break;
  //     case "/":
  //       result = Number(temporary1) / Number(temporary2);
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // console.log(result);

  // if (flag.length > 1) {
  //   console.log(result);
  //   setDisplay(JSON.stringify(result) + flag[1]);
  //   setfirsrOpt(flag[1]);
  // }
  const calc = () => {
    let result = 0;
    switch (firsrOpt) {
      case "+":
        result = Number(temporary1) + Number(temporary2);
        break;
      case "-":
        result = Number(temporary1) - Number(temporary2);
        break;
      case "*":
        switch (temporary2) {
          case "":
            result = Number(temporary1) * 1;
            break;
          default:
            result = Number(temporary1) * Number(temporary2);
            break;
        }
        break;
      case "/":
        switch (temporary2) {
          case "":
            result = Number(temporary1) / 1;
            break;
          default:
            result = Number(temporary1) / Number(temporary2);
            break;
        }
        break;
      default:
        break;
    }
    setTemporary1(result);
    setDisplay(result);
    console.log("result", result, typeof result);
  };

  const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
    (a) => (
      <button
        key={a}
        className="border p-5 "
        value={a}
        onClick={(a) => {
          if (display !== "0") {
            setDisplay((prev) => prev + a.target.value);
          } else {
            setDisplay(a.target.value);
          }
        }}
      >
        {a}
      </button>
    )
  );

  const operatorButtons = ["+", "-", "*", "/", "="].map((a) => (
    <button
      key={a}
      className="border p-5"
      value={a}
      onClick={(a) => {
        // console.log("opt", display.substring(display.length - 1) === ".");
        let flag = [];
        for (let i of display.split("")) {
          if (["+", "-", "*", "/"].includes(i)) {
            flag.push(i);
          }
        }
        console.log("flag", flag);
        if (a.target.value !== "=") {
          if (
            ["+", "-", "*", "/"].includes(
              display.substring(display.length - 1)
            ) ||
            display.substring(display.length - 1) === "."
          ) {
            setDisplay(
              (prev) => prev.substring(0, prev.length - 1) + a.target.value
            );
          } else {
            setDisplay((prev) => prev + a.target.value);
          }

          if (flag.length > 0) {
            calc();
            setDisplay((prev) => prev + a.target.value);
          }
        } else {
          calc();
          setDisplay((prev) => JSON.stringify(prev));
          setTemporary2("");
        }
      }}
    >
      {a}
    </button>
  ));

  return (
    <div className="h-screen w-screen flex bg-slate-300">
      <div className="m-auto ">
        <div className="border p-5 flex justify-between">
          <h1>display</h1>
          {display}
          <h1>{typeof display}</h1>
        </div>
        <div className="border p-5 flex justify-between">
          <h1>temporary 1</h1>
          {temporary1}
          <h1>{typeof temporary1}</h1>
        </div>
        <div className="border p-5 flex justify-between">
          <h1>temporary 2</h1>
          {temporary2}
          <h1>{typeof temporary2}</h1>
        </div>
        <div className="border p-5 flex justify-between">
          <h1>First operator</h1>
          {firsrOpt}
          <h1>{typeof firsrOpt}</h1>
        </div>

        <div className="flex">
          <div className="grid grid-cols-3">{numberButtons}</div>
          <div className="grid grid-cols-1">{operatorButtons}</div>
          <button
            className="border p-5"
            onClick={() => {
              if (temporary2 === "") {
                if (!temporary1.includes(".")) {
                  setDisplay((prev) => prev + ".");
                }
              } else {
                if (!temporary2.includes(".")) {
                  setDisplay((prev) => prev + ".");
                }
              }
              // console.log(temporary1.includes(a.target.value));
              // if (!temporary2.includes(a.target.value)) {
              //   if (!temporary1.includes(a.target.value)) {
              //     console.log("masuk");
              //     setDisplay((prev) => prev + a.target.value);
              //   }
              // } else {
              //   console.log("ga boleh");
              // }
              // if (
              //   !temporary2.includes(a.target.value) &&
              //   !["+", "-", "*", "/"].includes(
              //     display.split("")[display.length - 1]
              //   ) &&
              //   temporary2 !== ""
              // ) {
              //   setDisplay((prev) => prev + a.target.value);
              // }
            }}
          >
            .
          </button>
          <button
            className="border p-5"
            onClick={() => {
              if (display.length < 2) {
                setDisplay("0");
              } else if (display !== "0") {
                setDisplay((prev) => prev.substring(0, prev.length - 1));
              }
            }}
          >
            Delete
          </button>
          <button className="border p-5" onClick={() => setDisplay("0")}>
            AC
          </button>
          {/* <button
            className="border p-5"
            onClick={() => {
              if (temporary2 !== null && temporary2 !== "") {
                calc();
              }
            }}
          >
            =
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
