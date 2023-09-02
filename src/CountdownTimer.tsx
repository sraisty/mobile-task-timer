import { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'

function useInterval<T extends () => void>(callback: T, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === 'number') {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const getTimeParts = (secondsLeft: number) => {
  const SECOND = 1000
  const MINUTE = SECOND * 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24

  const days = Math.floor(secondsLeft / DAY)
  const hours = Math.floor((secondsLeft % DAY) / HOUR)
  const mins = Math.floor((secondsLeft % HOUR) / MINUTE)
  const secs = Math.floor(secondsLeft % MINUTE)
  return { days, hours, mins, secs }
}

export const CountdownTimer = ({
  taskDuration,
  isRunning,
}: {
  taskDuration: number
  isRunning: boolean
}) => {
  const [secondsLeft, setSecondsLeft] = useState(taskDuration)
  const { days, hours, mins, secs } = getTimeParts(secondsLeft)

  useInterval(
    () => {
      setSecondsLeft(secondsLeft - 1)
    },
    isRunning ? 1000 : null
  )

  return (
    <View>
      <Text>{secondsLeft}</Text>
      <Text style={{ fontSize: 36 }}>{`${hours}:${mins}:${secs}`}</Text>
    </View>
  )
}
