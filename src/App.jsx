import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    let id;
    if (timerActive) {
      id = setInterval(() => {
        setCount(c => c + 1)
      }, 1000)
    }

    return(() => {
      clearInterval(id)
    })
  }, [timerActive])

  return (
    <>
      <h1>pomos</h1>
      <h2>{count}</h2>
      <button onClick={() => setTimerActive(!timerActive)}>
        {timerActive ? 'pause' : 'start'} timer</button>
    </>
  )
}

export default App
