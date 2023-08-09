import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Timer from "./Timer";

function App() {
  const cycle = [
    { mode: "work", minutes: 25, seconds: 0 },
    { mode: "break", minutes: 5, seconds: 0 },
    { mode: "work", minutes: 25, seconds: 0 },
    { mode: "long break", minutes: 1, seconds: 0 },
  ];
  return (
    <>
      <main>
        <h1>pomos</h1>
        <Timer cycle={cycle} />
      </main>
    </>
  );
}

export default App;
