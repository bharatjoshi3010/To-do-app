import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { JSX, PropsWithChildren } from 'react'

type TaskProps = PropsWithChildren<{
    taskString : string;
    importance : boolean;
    index :number;
    onRemove: (id: number) => void;
}>



export default function TaskCard(props: TaskProps) : JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.text}>
        <View style={styles.main}>
        <Text style={styles.mainTxt}>{props.taskString}</Text>
        </View>
        <View style={styles.urgent}>
            <Text style={styles.urgentTxt}>{props.importance? 'Do it Nowww':'You can do it later'}</Text>
        </View>
        </View>
        
          <Pressable style={styles.btn}
        onPress={() => props.onRemove(props.index)} // calls App.tsx to remove this task
      ><View >
            <Text style={styles.btnText}>Remove</Text>
            </View>
          </Pressable>
          
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    backgroundColor: '#bacae7',
    marginHorizontal :8,
    flexDirection : 'row',
    marginBottom: 7,
    // elevation: 15,
    paddingLeft: 20,
    paddingRight: 5,
    // justifyContent: "space-between", //here text:{ flex:1} holding the space till the end so we do not need it
    alignItems :'center',
    paddingVertical: 5,
    borderRadius : 50,
    // overflow: 'hidden'
  },
  text:{
    flex: 1
  },
  main:{
    
  },
  urgent:{

  },
  mainTxt:{
    fontSize : 28,
    color : 'black',
    fontWeight :'bold'
  },
  urgentTxt:{
    fontSize : 12
  },
  btn:{
    // flex: 1,
    backgroundColor: '#4c5487',
    alignSelf: 'stretch',
    width: 90,
    borderRadius: 50,
    alignItems : 'center',
    justifyContent: 'center',
    
  },
  btnText:{
    color: 'white',
    fontWeight : 'bold',
    fontSize : 15,
  }

})