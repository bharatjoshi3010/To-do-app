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
    <View>
        <View>
        <Text>{props.taskString}</Text>
        </View>
        <View>
            <Text>{props.importance? 'Do it Nowww':'You can do it later'}</Text>
        </View>
        <View>
          <Pressable
        onPress={() => props.onRemove(props.index)} // calls App.tsx to remove this task
      >
            <Text>Remove</Text>
          </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})