import { Button, FlatList, TextInput, View } from 'react-native'
import { Task } from './types'
import { styles } from './styles'

export const EditTasksScreen = ({
  tasks,
  onChangeTasks,
}: {
  tasks: Task[]
  onChangeTasks: (tasks: Task[]) => void
}) => {
  const addTask = (taskStr: string) => {
    onChangeTasks([...tasks, { name: taskStr, durationSec: 0 }])
  }

  const editTask = (index: number, newTaskStr: string, newTime: number) => {
    const newTasks = [...tasks]
    newTasks[index].name = newTaskStr
    newTasks[index].durationSec = newTime
    onChangeTasks(newTasks)
  }

  return (
    <>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              padding: 10,
              backgroundColor: '#BBB',
            }}
          >
            <TextInput
              value={item.name}
              onChangeText={(text) => editTask(index, text, item.durationSec)}
              style={{ ...styles.input, width: 200 }}
            />
            <TextInput
              value={`${item.durationSec}`}
              onChangeText={(text) => editTask(index, item.name, +text)}
              style={{ ...styles.input, width: 80 }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <Button title="Add Task" onPress={() => addTask('')} />
        }
      />
    </>
  )
}
