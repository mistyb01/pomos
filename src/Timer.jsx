import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

function Timer({startMin, startSecs}) {
    const [timerActive, setTimerActive] = useState(false)
    const [timerStartTime, setTimerStartTime] = useState(null)
  
    const [remainingTime, setRemainingTime] = useState({
      minutes: startMin, 
      seconds: startSecs
    })
    const [initialTime, setInitialTime] = useState({
      minutes: startMin,
      seconds: startSecs
    })
  
  
    useEffect(() => {
      let id;
      let remainingTimeMins;
      let remainingTimeSecs;
  
      if (timerActive) {
        id = setInterval(() => {
          let currentTime = dayjs();
          let diffInSecs = currentTime.diff(timerStartTime, 'seconds')
  
          const initialInSecs = (initialTime.minutes * 60) + initialTime.seconds;
          const remainingInSecs = initialInSecs - diffInSecs;
  
          remainingTimeSecs = remainingInSecs % 60;
          remainingTimeMins = Math.floor(remainingInSecs / 60);
  
          setRemainingTime({minutes: remainingTimeMins, seconds: remainingTimeSecs})
  
          if (remainingTimeMins === 0 && remainingTimeSecs === 0) {
            setTimerActive(!timerActive)
          }
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

    return(
        <>
        <h2>{remainingTime.minutes}:{remainingTime.seconds.toString().padStart(2,'0')}</h2>
        
        <button onClick={handleTimerStart}>
            {timerActive ? 'pause' : 'start'} timer</button>
        </>
    )
  }

  export default Timer