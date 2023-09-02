import { Button, View, Text } from 'react-native'
import { CountdownTimer } from './CountdownTimer'
import { useState } from 'react'
import { Task } from './types'
import { styles } from './styles'

export const ExecuteTasksScreen = ({ tasks }: { tasks: Task[] }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

  const skipTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
  }
  const currentTask = tasks[currentTaskIndex]
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>{currentTask.name}</Text>
      <CountdownTimer
        taskDuration={currentTask.durationSec}
        isRunning={isRunning}
      />
      {isRunning ? (
        <Button title="DONE" onPress={stopTimer} />
      ) : (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="START" onPress={() => setIsRunning(true)} />
          <Button title="Skip Task" onPress={skipTask} />
          {/* TODO RESET BUTTON */}
        </View>
      )}
    </View>
  )
}
