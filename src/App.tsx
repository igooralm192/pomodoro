import React, { useCallback, useEffect, useState } from 'react'
import ReactSound from 'react-sound'

import Logo from './assets/images/logo.svg'
import Play from './assets/images/play.svg'
import Pause from './assets/images/pause.svg'
import Stop from './assets/images/stop.svg'
import Reset from './assets/images/reset.svg'

import IconButton from './components/IconButton'
import Alert from './components/Alert'

import useTimer, { TimerState } from './hooks/useTimer'
import formatNumberToString from './utils/formatNumberToString'

import './App.scss'

enum SessionState {
  WORKING = 'WORKING',
  BREAKING = 'BREAKING',
}

enum PlayerState {
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

const TOTAL_SESSIONS = 4

const App: React.FC = () => {
  const [workingTime, setWorkingTime] = useState(25)
  const [breakingTime, setBreakingTime] = useState(5)

  const {
    time: currentTime,
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useTimer()

  const [sessionState, setSessionState] = useState<SessionState>(
    SessionState.WORKING,
  )

  const [sessionNumber, setSessionNumber] = useState<number>(1)

  // const [play, { isPlaying, stop }] = useSound('/sounds/alert.mp3')

  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.STOPPED,
  )

  function handleWorkingTime(value: number) {
    setWorkingTime(value)
  }

  function handleBreakingTime(value: number) {
    if (value > workingTime) setWorkingTime(value)

    setBreakingTime(value)
  }

  const handleStart = useCallback(() => {
    startTimer({
      minute: workingTime,
      second: 0,
    })
  }, [workingTime, startTimer])

  const handlePause = useCallback(() => {
    pauseTimer()
  }, [pauseTimer])

  const handleResume = useCallback(() => {
    resumeTimer()
  }, [resumeTimer])

  const handleStop = useCallback(() => {
    setSessionState(SessionState.WORKING)
    stopTimer()
  }, [stopTimer])

  const handleReset = useCallback(() => {
    setSessionState(SessionState.WORKING)
    setSessionNumber(1)
    stopTimer()
  }, [stopTimer])

  const changeToWorkingSession = useCallback(() => {
    if (sessionNumber === TOTAL_SESSIONS) {
      handleReset()

      return
    }

    setSessionState(SessionState.WORKING)
    setSessionNumber(oldSessionNumber => oldSessionNumber + 1)

    startTimer({
      minute: workingTime,
      second: 0,
    })
  }, [workingTime, sessionNumber, handleReset, startTimer])

  const changeToBreakingSession = useCallback(() => {
    setSessionState(SessionState.BREAKING)

    let newBreakingTime = breakingTime
    if (sessionNumber === 4) {
      newBreakingTime *= 2
    }

    startTimer({
      minute: newBreakingTime,
      second: 0,
    })
  }, [breakingTime, sessionNumber, startTimer])

  const renderActions = useCallback(() => {
    const playButton = (
      <IconButton
        key="play"
        icon={Play}
        onClick={timerState === TimerState.INITIAL ? handleStart : handleResume}
      />
    )

    const stopButton = (
      <IconButton key="stop" icon={Stop} onClick={handleStop} />
    )

    const pauseButton = (
      <IconButton
        key="pause"
        icon={Pause}
        disabled={
          timerState === TimerState.IN_PROGRESS && sessionState === 'BREAKING'
        }
        onClick={handlePause}
      />
    )

    const resetButton = (
      <IconButton key="reset" icon={Reset} onClick={handleReset} />
    )

    switch (timerState) {
      case TimerState.IN_PROGRESS:
        return [
          stopButton,
          pauseButton,
          sessionNumber > 1 ? resetButton : undefined,
        ]

      case TimerState.PAUSED:
        return [
          stopButton,
          playButton,
          sessionNumber > 1 ? resetButton : undefined,
        ]

      default:
        return [playButton, sessionNumber > 1 ? resetButton : undefined]
    }
  }, [
    timerState,
    sessionState,
    sessionNumber,
    handleStart,
    handlePause,
    handleResume,
    handleStop,
    handleReset,
  ])

  const renderTime = useCallback(() => {
    const time = currentTime ?? {
      minute: workingTime,
      second: 0,
    }

    const parsedMinute = formatNumberToString(time.minute)
    const parsedSecond = formatNumberToString(time.second)

    return `${parsedMinute}:${parsedSecond}`
  }, [currentTime, workingTime])

  useEffect(() => {
    if (timerState !== TimerState.FINISHED) return

    switch (sessionState) {
      case SessionState.WORKING:
        changeToBreakingSession()
        break

      default:
        changeToWorkingSession()
        break
    }
  }, [
    timerState,
    sessionState,
    changeToWorkingSession,
    changeToBreakingSession,
  ])

  console.log(timerState, sessionState, sessionNumber, currentTime)

  return (
    <main id="main-container">
      <div className="content">
        <div id="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        <div id="progress-container">
          <div className="progress">
            <div className="session-timer">
              <span className="type">
                {sessionState === SessionState.WORKING
                  ? 'Trabalho'
                  : 'Descanso'}
              </span>
              <span className="timer">{renderTime()}</span>
            </div>
            <div className="session-count">
              <span className="title">Sessão</span>
              <span className="number">
                {`${sessionNumber} / ${TOTAL_SESSIONS}`}
              </span>
            </div>
          </div>
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
              min={Math.max(1, breakingTime)}
              max={60}
              value={workingTime}
              disabled={sessionNumber > 1 || timerState !== TimerState.INITIAL}
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
              disabled={sessionNumber > 1 || timerState !== TimerState.INITIAL}
              onChange={e => handleBreakingTime(Number(e.target.value))}
            />
          </fieldset>
        </form>
      </div>

      <Alert
        title="Vai descansar!"
        message="Já trabalhou demais fera, tá na hora de dar um descanso."
        open
        onClose={() => {
          console.log('fechou')
        }}
      />

      <ReactSound url="/sounds/alert.mp3" playStatus={playerState} />
    </main>
  )
}

export default App
