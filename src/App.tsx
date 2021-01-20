import React, { useCallback, useEffect, useState } from 'react'

import Logo from './assets/logo.svg'
import Play from './assets/play.svg'
import Pause from './assets/pause.svg'
import Stop from './assets/stop.svg'
import Reset from './assets/reset.svg'

import IconButton from './components/IconButton'
import useTimer, { TimerState } from './hooks/useTimer'
import formatNumberToString from './utils/formatNumberToString'

import './App.scss'

enum SessionState {
  WORKING = 'WORKING',
  BREAKING = 'BREAKING',
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
    if (!currentTime) return
    if (currentTime.minute !== 0 || currentTime.second !== 0) return

    switch (sessionState) {
      case SessionState.WORKING: {
        setSessionState(SessionState.BREAKING)
        stopTimer()

        let newBreakingTime = breakingTime
        if (sessionNumber === 4) {
          newBreakingTime *= 2
        }

        startTimer({
          minute: newBreakingTime,
          second: 0,
        })

        break
      }

      default: {
        if (sessionNumber === TOTAL_SESSIONS) {
          handleReset()

          return
        }

        setSessionState(SessionState.WORKING)
        setSessionNumber(oldSessionNumber => oldSessionNumber + 1)

        stopTimer()
        startTimer({
          minute: workingTime,
          second: 0,
        })

        break
      }
    }
  }, [
    currentTime,
    workingTime,
    breakingTime,
    startTimer,
    stopTimer,
    sessionState,
    sessionNumber,
    handleReset,
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
    </main>
  )
}

export default App
