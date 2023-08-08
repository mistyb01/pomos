import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

function App() {

  const [timerActive, setTimerActive] = useState(false)
  const [timerStartTime, setTimerStartTime] = useState(null)

  const [remainingTime, setRemainingTime] = useState({
    minutes: 2, 
    seconds: 0
  })
  const [initialTime, setInitialTime] = useState({
    minutes: 2,
    seconds: 0
  })


  useEffect(() => {
    let id;

    let remainingTimeMins;
    let remainingTimeSecs;

    if (timerActive) {
      console.log('start', timerStartTime)
      id = setInterval(() => {
        let currentTime = dayjs();
        let diffInSecs = currentTime.diff(timerStartTime, 'seconds')

        const initialInSecs = (initialTime.minutes * 60) + initialTime.seconds;
        const remainingInSecs = initialInSecs - diffInSecs;

        remainingTimeSecs = remainingInSecs % 60;
        remainingTimeMins = Math.floor(remainingInSecs / 60);

        setRemainingTime({minutes: remainingTimeMins, seconds: remainingTimeSecs})
      }, 1000)
      return () => {
        clearInterval(id);
        setInitialTime({minutes: remainingTimeMins, seconds: remainingTimeSecs})
      }
    }
  }, [timerActive])

  function handleTimerStart() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setTimerActive(!timerActive)
  }

  return (
    <>
      <h1>pomos</h1>
      <Timer>{remainingTime.minutes}:{remainingTime.seconds}</Timer>


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
