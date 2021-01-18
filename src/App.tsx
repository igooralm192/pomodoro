import React, { useCallback, useState } from 'react'

import Logo from './assets/logo.svg'
import Play from './assets/play.svg'
import Stop from './assets/stop.svg'
import Pause from './assets/pause.svg'

import IconButton from './components/IconButton'
import formatNumberToString from './utils/formatNumber'

import './App.scss'
import useTimer from './hooks/useTimer'

type InitialState = 'INITIAL'
type InProgressState = 'IN_PROGRESS'
type PausedState = 'PAUSED'

type AppState = InitialState | InProgressState | PausedState

const defaultState: AppState = 'INITIAL'

const App: React.FC = () => {
  const [workingTime, setWorkingTime] = useState(25)
  const [breakingTime, setBreakingTime] = useState(5)

  const [state, setState] = useState<AppState>(defaultState)

  const {
    time: currentTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useTimer()

  function handleWorkingTime(value: number) {
    setWorkingTime(value)
  }

  function handleBreakingTime(value: number) {
    if (value > workingTime) setWorkingTime(value)

    setBreakingTime(value)
  }

  const handleStart = useCallback(() => {
    setState('IN_PROGRESS')

    startTimer({
      minute: workingTime,
      second: 0,
    })
  }, [workingTime, startTimer])

  const handlePause = useCallback(() => {
    setState('PAUSED')
    pauseTimer()
  }, [pauseTimer])

  const handleResume = useCallback(() => {
    setState('IN_PROGRESS')
    resumeTimer()
  }, [resumeTimer])

  const handleStop = useCallback(() => {
    setState('INITIAL')
    stopTimer()
  }, [stopTimer])

  const renderActions = useCallback(() => {
    const playButton = (
      <IconButton
        key="play"
        icon={Play}
        onClick={state === 'INITIAL' ? handleStart : handleResume}
      />
    )

    const stopButton = (
      <IconButton key="stop" icon={Stop} onClick={handleStop} />
    )
    const pauseButton = (
      <IconButton key="pause" icon={Pause} onClick={handlePause} />
    )

    switch (state) {
      case 'IN_PROGRESS':
        return [stopButton, pauseButton]

      case 'PAUSED':
        return [stopButton, playButton]

      default:
        return playButton
    }
  }, [state, handleStart, handlePause, handleResume, handleStop])

  const renderTime = useCallback(() => {
    const time = currentTime ?? {
      minute: workingTime,
      second: 0,
    }

    const parsedMinute = formatNumberToString(time.minute)
    const parsedSecond = formatNumberToString(time.second)

    return `${parsedMinute}:${parsedSecond}`
  }, [currentTime, workingTime])

  console.log(state, currentTime)

  return (
    <main id="main-container">
      <div className="content">
        <div id="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        <div id="progress-container">
          <div className="progress">{renderTime()}</div>
        </div>

        <div id="actions-container">{renderActions()}</div>

        <form id="inputs-container">
          <fieldset className="input-container">
            <label htmlFor="working-input">
              Trabalho:&nbsp;
              {workingTime}
              &nbsp;minutos
            </label>
            <input
              id="working-input"
              type="range"
              min={Math.max(5, breakingTime)}
              max={60}
              value={workingTime}
              disabled={state !== 'INITIAL'}
              onChange={e => handleWorkingTime(Number(e.target.value))}
            />
          </fieldset>

          <fieldset className="input-container">
            <label htmlFor="breaking-input">
              Descanso:&nbsp;
              {breakingTime}
              &nbsp;minutos
            </label>
            <input
              id="breaking-input"
              type="range"
              min={1}
              max={20}
              value={breakingTime}
              disabled={state !== 'INITIAL'}
              onChange={e => handleBreakingTime(Number(e.target.value))}
            />
          </fieldset>
        </form>
      </div>
    </main>
  )
}

export default App
