import { useCallback, useEffect, useState } from 'react'

interface Time {
  minute: number
  second: number
}

interface IReturn {
  time: Time | undefined
  startTimer: (time: Time) => void
}

const useTimer = (): IReturn => {
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>()

  const [time, setTime] = useState<Time>()

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
    const interval = setInterval(handleTime, 1000)
    setIntervalRef(interval)

    setTime(newTime)
  }

  return {
    time,
    startTimer,
  }
}

export default useTimer
