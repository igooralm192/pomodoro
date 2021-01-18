import { useCallback, useState } from 'react'

interface Time {
  minute: number
  second: number
}

interface IReturn {
  time: Time | undefined
  startTimer: (time: Time) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
}

const useTimer = (): IReturn => {
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>()

  const [time, setTime] = useState<Time>()

  const handleTime = useCallback(() => {
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
  }, [])

  function startTimer(newTime: Time) {
    createIntervalRef()

    setTime(newTime)
  }

  function pauseTimer() {
    removeIntervalRef()
  }

  function resumeTimer() {
    createIntervalRef()
  }

  function stopTimer() {
    removeIntervalRef()

    setTime(undefined)
  }

  const createIntervalRef = useCallback(() => {
    const interval = setInterval(handleTime, 1000)
    setIntervalRef(interval)
  }, [handleTime])

  const removeIntervalRef = useCallback(() => {
    setIntervalRef(oldIntervalRef => {
      if (oldIntervalRef) clearInterval(oldIntervalRef)

      return undefined
    })
  }, [])

  return {
    time,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  }
}

export default useTimer
