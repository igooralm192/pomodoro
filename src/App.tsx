import React, { useCallback, useState } from 'react'

import Logo from './assets/logo.svg'
import Play from './assets/play.svg'
import Stop from './assets/stop.svg'
import Pause from './assets/pause.svg'

import IconButton from './components/IconButton'

import './App.scss'

type InitialState = 'INITIAL'
type InProgressState = 'IN_PROGRESS'
type PausedState = 'PAUSED'

type AppState = InitialState | InProgressState | PausedState

const defaultState: AppState = 'INITIAL'

const App: React.FC = () => {
  const [workingTime, setWorkingTime] = useState(25)
  const [breakingTime, setBreakingTime] = useState(5)

  const [state, setState] = useState<AppState>(defaultState)

  const [time, setTime] = useState()

  function handleWorkingTime(value: number) {
    setWorkingTime(value)
  }

  function handleBreakingTime(value: number) {
    setBreakingTime(value)
  }

  function handleStart() {
    setState('IN_PROGRESS')
  }

  function handlePause() {
    setState('PAUSED')
  }

  function handleResume() {
    setState('IN_PROGRESS')
  }

  function handleStop() {
    setState('INITIAL')
  }

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
  }, [state])

  return (
    <main id="main-container">
      <div className="content">
        <div id="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        <div id="progress-container">
          <div className="progress">25:00</div>
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
              min={5}
              max={60}
              value={workingTime}
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
              onChange={e => handleBreakingTime(Number(e.target.value))}
            />
          </fieldset>
        </form>
      </div>
    </main>
  )
}

export default App
