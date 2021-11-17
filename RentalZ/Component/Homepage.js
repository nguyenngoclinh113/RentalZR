import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View } from 'react-native';
import TextR from './TextR'
import DialogError from './Open dialog/DialogError'
import DialogSuccess from './Open dialog/DialogSuccess'



export default function Home({navigation}) {
// biến show model
  const [show, setShow] = useState(false)
  const[status, setStatus] = useState('')
//container
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>RentalZ!</Text>
      <TextR navigation={navigation} setShow={setShow} setStatus={setStatus} />
      {status=== 'error'?(<DialogError name="alert-circle" show={show} setShow={setShow}/>):(<DialogSuccess show={show} setShow={setShow}/>)}
    </View>

  );
}
//Styheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Header: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',
  }
});