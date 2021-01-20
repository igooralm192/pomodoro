import { useEffect, useState } from 'react'

export enum TimerState {
  INITIAL = 'INITIAL',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
}

interface Time {
  minute: number
  second: number
}

interface IReturn {
  time: Time | undefined
  timerState: TimerState
  startTimer: (time: Time) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
}

const INTERVAL_TIME = 50

const useTimer = (): IReturn => {
  const [time, setTime] = useState<Time>()
  const [timerState, setTimerState] = useState<TimerState>(TimerState.INITIAL)

  function handleTime() {
    setTime(oldTime => {
      if (!oldTime) return undefined

      const newTime: Time = { ...oldTime }

      if (newTime.second === 0) {
        newTime.minute -= 1
        newTime.second = 59
      } else {
        newTime.second -= 1
      }

      return newTime
    })
  }

  function startTimer(newTime: Time) {
    setTime(newTime)
    setTimerState(TimerState.IN_PROGRESS)
  }

  function pauseTimer() {
    setTimerState(TimerState.PAUSED)
  }

  function resumeTimer() {
    setTimerState(TimerState.IN_PROGRESS)
  }

  function stopTimer() {
    setTime(undefined)
    setTimerState(TimerState.INITIAL)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (timerState === TimerState.IN_PROGRESS) {
      timeout = setTimeout(handleTime, INTERVAL_TIME)
    }

    return () => clearTimeout(timeout)
  }, [time, timerState])

  return {
    time,
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  }
}

export default useTimer
