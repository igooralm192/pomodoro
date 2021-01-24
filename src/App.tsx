import React, { useCallback, useEffect, useState } from 'react'
import ReactSound from 'react-sound'

import './App.scss'

import Logo from './assets/images/logo.svg'
import Pause from './assets/images/pause.svg'
import Play from './assets/images/play.svg'
import Reset from './assets/images/reset.svg'
import Stop from './assets/images/stop.svg'

import Alert from './components/Alert'
import IconButton from './components/IconButton'

import useTimer, { TimerState } from './hooks/useTimer'
import formatNumberToString from './utils/formatNumberToString'

enum SessionState {
  WORKING = 'WORKING',
  BREAKING = 'BREAKING',
}

enum PlayerState {
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

interface AlertOptions {
  open: boolean
  title?: string
  message?: string
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

  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.STOPPED,
  )

  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    open: false,
  })

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

  const handleAlertOpen = useCallback(() => {
    const title =
      sessionState === SessionState.WORKING
        ? 'Vai descansar!'
        : 'Hora de trabalhar!'

    const message =
      sessionState === SessionState.WORKING
        ? 'Já ta na hora de descansar.'
        : 'Já ta na hora de trabalhar.'

    setPlayerState(PlayerState.PLAYING)
    setAlertOptions({ open: true, title, message })
  }, [sessionState])

  const handleAlertClose = useCallback(() => {
    setPlayerState(PlayerState.STOPPED)
    setAlertOptions({ ...alertOptions, open: false })

    switch (sessionState) {
      case SessionState.WORKING:
        changeToBreakingSession()
        break

      default:
        changeToWorkingSession()
        break
    }
  }, [
    alertOptions,
    sessionState,
    changeToBreakingSession,
    changeToWorkingSession,
  ])

  useEffect(() => {
    if (timerState !== TimerState.FINISHED) return

    handleAlertOpen()
  }, [timerState, handleAlertOpen])

  // console.log(timerState, sessionState, sessionNumber, currentTime)

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
              {`Trabalho: ${workingTime} minutos`}
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
              {`Descanso: ${breakingTime} minutos`}
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
        title={alertOptions.title ?? ''}
        message={alertOptions.message ?? ''}
        open={alertOptions.open}
        onClose={handleAlertClose}
      />

      <ReactSound url="/sounds/alert.mp3" playStatus={playerState} />
    </main>
  )
}

export default App
