import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

function App() {

  const [timerActive, setTimerActive] = useState(false)
  const [timerStartTime, setTimerStartTime] = useState(null)

  const [remainingTime, setRemainingTime] = useState(null)
  const [initialTime, setInitialTime] = useState({
    minutes: 2,
    seconds: 0
  })


  useEffect(() => {
    let id;
    if (timerActive) {
      console.log('start', timerStartTime)
      id = setInterval(() => {
        let currentTime = dayjs();
        let diffInSecs = currentTime.diff(timerStartTime, 'seconds')

        const initialInSecs = (initialTime.minutes * 60) + initialTime.seconds;
        const remainingInSecs = initialInSecs - diffInSecs;

        const remainingTimeSecs = remainingInSecs % 60;
        const remainingTimeMins = Math.floor(remainingInSecs / 60);

        console.log(remainingTimeMins, ':', remainingTimeSecs)

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
      <Timer>25:00</Timer>


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
