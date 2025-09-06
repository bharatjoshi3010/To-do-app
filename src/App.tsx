import { BackHandler, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import TaskCard from './components/TaskCard';
import { taskLists, updateMasterTaskList } from './taskList';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage'


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {
  // const [length, setLength] = useState(taskLists.length)
  const [taskText, setTaskText] = useState('')
  const [imp, setImp] = useState(false)
  const [arr, setArr] = useState(taskLists)


  //for storing the data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tasks');

        if (jsonValue != null) {
          const savedTasks = JSON.parse(jsonValue);

          setArr(savedTasks); // Update state
          updateMasterTaskList(savedTasks); // Sync master array
          console.log('Loaded tasks from local storage:', savedTasks);
        } else {
          // If no local storage data found, use default master array
          setArr(taskLists);
          console.log('No saved data, using default taskList:', taskLists);
        }
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    };

    fetchTasks();
  }, []);

  //for fecting the data
  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonValue = JSON.stringify(arr);
        await AsyncStorage.setItem('tasks', jsonValue);

        // Also update master array
        updateMasterTaskList(arr);

        console.log('Tasks saved to local storage & master array:', arr);
      } catch (e) {
        console.error('Error saving tasks:', e);
      }
    };

    saveTasks();
  }, [arr]);


  const handleAddTask = () => {
    if (taskText.trim() === '') return;

    // ✅ Always create a new array
    const updatedTasks = [...arr, {
      taskString: taskText,
      importance: imp
    }];
    setArr(updatedTasks);
    setTaskText('');

    console.log('Added task:', taskText);
  };
  const handleRemoveTask = (index: number) => {
    const updatedTasks = arr.filter((_, i) => i !== index);
    setArr(updatedTasks);
    // taskLists = arr;
  };

  return (
    <SafeAreaView style={{backgroundColor:'#e7eef8', flex:1
    }}>
      <View style={styles.inputArea}>
        <View style = {styles.textArea}>
          <TextInput
            style={styles.input}
            value={taskText}
            onChangeText={setTaskText}
            placeholder='Enter your task here'
            >
          </TextInput>


            <View style={styles.check}>
            
            <View><BouncyCheckbox
              // style={{paddingRight:}}
              isChecked={imp}
              fillColor="black"
              // text='Is Important'
              // textStyle={{color:'red'}}
              onPress={() => (setImp(!imp))
              }
            /></View>
            <Text style={[styles.checkTxt, {fontWeight :'bold', color:'black'}]}>Is Important</Text>
            
            <View></View>
            
          </View>
        </View>  
      
      <Pressable style={styles.addBtn}
      onPress={() => {
            if (taskText) {
              handleAddTask();
              setImp(false)
              // setArr(taskLists)
            } else {
              Snackbar.show({
                text: "Enter a value to convert",
                backgroundColor: "#EA7773",
                textColor: "#000000"
              })
            }

          }}>

            <Text style={styles.addBtnTxt}>Save Task</Text>
      </Pressable>
      </View>  
      <View>
          <FlatList
            style={styles.flat}
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

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputArea:{
    // elevation: 20,
    backgroundColor:'#bacae7',
    paddingRight: 5,
    paddingLeft : 20,
    marginHorizontal :4,
    flexDirection : 'row',
    alignItems :'center',
    justifyContent : 'space-between',
    borderRadius : 50,
    height : 100
  },
  input:{
    height: 60,
    borderBottomWidth: 2,
    paddingBottom : 0,
    marginBottom : 10,
    fontSize : 18,
  },
  flat: {
    marginBottom: 10,
    marginTop: 20
  },
  textArea:{
    marginHorizontal: 5,
    marginBottom : 10,
    // backgroundColor :'aqua',
    flex : 1,
    marginRight : 20
  },
  check:{
    flexDirection :'row',
    alignItems : 'center',
    // justifyContent :'center',
    width :80,
    height : 20,
    paddingTop: 0
  },
  checkTxt:{
  },
  addBtn:{
    alignSelf : 'stretch',
    marginVertical : 5,
    width : 90,
    borderRadius : 50,
    alignItems : 'center',
    backgroundColor:'#4c5487',
    justifyContent :'center',
  },
  addBtnTxt:{
    color : 'white',
    fontWeight: 'bold'
  }
})