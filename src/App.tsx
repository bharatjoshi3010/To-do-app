import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={()=> {
        ReactNativeHapticFeedback.trigger("impactHeavy", options);
      }}>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>Click Me</Text>
        </View></Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: 'pink'
  },
  btn:{
    borderWidth: 2,
    height : 50,
    width: 100,
    justifyContent: 'center',
    alignItems : 'center'
  },
  btnTxt:{
    fontWeight : 'bold',
    fontSize : 20
  }
})