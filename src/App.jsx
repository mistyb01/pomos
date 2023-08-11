import { useState, useEffect } from "react";
import Timer from "./Timer";

function App() {
  const cycle = [
    { mode: "work", minutes: 20, seconds: 0 },
    { mode: "break", minutes: 5, seconds: 0 },
    { mode: "work", minutes: 20, seconds: 0 },
    { mode: "break", minutes: 5, seconds: 0 },
    { mode: "work", minutes: 20, seconds: 0 },
  ];
  
  return (
    <>
      <main>
        <Timer cycle={cycle} />
      </main>
    </>
  );
}

export default App;
