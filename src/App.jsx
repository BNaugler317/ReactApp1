import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [taskName, setTaskName] = useState('')
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [completedSessions, setCompletedSessions] = useState([])

  function handleStart() {
    setIsTimerActive(true)
  }

  function handleStop() {
    const completedSession = {
      task: taskName,
      duration: elapsedSeconds
    }

    setCompletedSessions([...completedSessions, completedSession])
    setIsTimerActive(false)
    setElapsedSeconds(0)
    setTaskName('')
  }

  useEffect(() => {
    let timer

    if (isTimerActive) {
      timer = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isTimerActive])

  return (
  <>  
    <div className="app">
      <section className="tracker-card">
        <h1>Focus Tracker App</h1>
        
        <input className="task-input" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} disabled={isTimerActive} />
        <div className="button-row">
          <button className="start" disabled={taskName === '' || isTimerActive} onClick={handleStart}>
            Start
          </button>
        
          <button className="stop" disabled={!isTimerActive} onClick={handleStop}>
            Stop
          </button>
        </div>

        <p className="timer">{elapsedSeconds} seconds</p>

      </section>
    </div>

    <section className="event-log">
        <h2>Event Log</h2>

        {completedSessions.length === 0 ? (
          <p>No completed sessions yet.</p>
        ) : (
          <ul>
            {completedSessions.map((session, index) => (
              <li key={index}>
                {session.task} - {session.duration} seconds
              </li>
            ))}
          </ul>
        )}
      </section>
  </>    
  )
}

export default App
