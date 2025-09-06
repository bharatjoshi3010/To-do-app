import { BackHandler, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import TaskCard from './components/TaskCard';
import { taskLists } from './taskList';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {
  // const [length, setLength] = useState(taskLists.length)
  const [taskText, setTaskText] = useState('')
  const [imp, setImp] = useState(false)
  const [arr, setArr] = useState(taskLists)


  const handleRemoveTask = (index: number) => {
    const updatedTasks = arr.filter((_, i) => i !== index);
    setArr(updatedTasks);
    // taskLists = arr;
  };

  return (
    <SafeAreaView>
      <View><TextInput
      value={taskText}
      onChangeText={setTaskText}
      placeholder='Enter your task here'>
      </TextInput>

      <View>
        <BouncyCheckbox
                isChecked={imp}
                fillColor="red"
                onPress={() => (setImp(!imp)) 
                }
          />
          <Text>Is Important</Text>
        <Pressable onPress={()=>{
          arr.push({
            taskString : taskText,
            importance : imp
          })
          setTaskText('')
          setImp(false)
        }}>
          
        <Text>Save Task</Text>
        </Pressable>
        
      </View>
      <View>
        <FlatList
            data={arr}
            keyExtractor={(item, index) => index.toString()} // <-- generates "0", "1", "2"...
            renderItem={({ item, index }) => (
            <TaskCard
              taskString={item.taskString}
              importance={item.importance}
              index={index}
              onRemove={handleRemoveTask}
        />
        )}
    />
      </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})