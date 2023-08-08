import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Timer from './Timer'

function App() {

  return (
    <>
      <main>
        <h1>pomos</h1>
        <Timer startMin={25} startSecs={0}/>
      </main>
    </>
  )
}


export default App
