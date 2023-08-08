import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

function App() {
  const [remainingTime, setRemainingTime] = useState({
    minutes: '25',
    seconds: '00'
  })
  const [timerActive, setTimerActive] = useState(false)
  const [timerStartTime, setTimerStartTime] = useState(null)

  useEffect(() => {
    let id;
    if (timerActive) {
      console.log('start', timerStartTime)
      id = setInterval(() => {
        let currentTime = dayjs();
        console.log('start', timerStartTime.format('HH:mm:ss'), 'current', currentTime.format('HH:mm:ss'))
      }, 1000)
      return () => clearInterval(id)
    }
  }, [timerActive])

  function handleTimerStart() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setTimerActive(!timerActive)
  }

  return (
    <>
      <h1>pomos</h1>
      <Timer>{remainingTime.minutes} : {remainingTime.seconds}</Timer>


      <button onClick={handleTimerStart}>
        {timerActive ? 'pause' : 'start'} timer</button>

    </>
  )
}

function Timer({children}) {
  return(
    <h2>{children}</h2>
  )
}

export default App
