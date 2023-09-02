import { useCallback, useState } from 'react'
import { Button, View, FlatList, TextInput } from 'react-native'
import { ExecuteTasksScreen } from './src/ExecuteTasksScreen'
import { EditTasksScreen } from './src/EditTasksScreen'
import { Mode, Task } from './src/types'
import { styles } from './src/styles'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [mode, setMode] = useState<Mode>('edit')

  // const deleteTask = (index: number) => {
  //   const newTasks = tasks.filter((_, i) => i !== index)
  //   setTasks(newTasks)
  // }
  const onChangeTasks = useCallback((tasks: Task[]) => {
    setTasks(tasks)
  }, [])

  return (
    <View style={styles.container}>
      {mode === 'execute' ? (
        <>
          <ExecuteTasksScreen tasks={tasks} />
          <Button
            title="Edit Task List"
            onPress={() => setMode('edit')}
            disabled={tasks.length === 0}
          />
        </>
      ) : (
        <>
          <EditTasksScreen tasks={tasks} onChangeTasks={onChangeTasks} />
          <Button
            title="Start"
            onPress={() => setMode('execute')}
            disabled={tasks.length === 0}
          />
        </>
      )}
    </View>
  )
}
