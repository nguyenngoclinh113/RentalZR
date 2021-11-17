import React, { useState } from 'react'
import { Modal,View,StyleSheet, Text, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('database','1.0')
const NoteModal = ({showNote,setShowNote,id}) => {
    const [note,setNote] = useState('')
    const updateNote = async()=>{
        if(id){
            await db.transaction((tx)=>{
                tx.executeSql(
                    `UPDATE mobieapp SET note=? WHERE idData=?`,
                    [note,id],
                    (tx,result)=>{
                        console.log("oke")
                        Alert.alert(
                            "Alert Title",
                            `Edit successfully`,
                            [
                               
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                         );
                    },
                    (error)=>{
                        Alert.alert(
                            "Alert Title",
                            `You can not edit, please check it again`,
                            [
                               
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                         );
                    }
                )
            })
        }else{
            Alert.alert(
                "Alert Title",
                `ID ${id} is not existed to edit note field`,
                [
                   
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
             );
        }
    }
    return (
        <Modal transparent visible={showNote}>
        <StatusBar backgroundColor='rgba(0,0,0,0.3)'/>
              <View style={styles.container}>
                  <View style={styles.inside}>
                     <Text style={{fontSize:25, marginLeft:40,marginTop:15}}>Edit Note</Text>
                     <TextInput
                         value={note}
                         onChangeText={(text)=>setNote(text)}
                         multiline
                         numberOfLines={12}
                         style={styles.input}
                         textAlignVertical="top"
                     />
                     <View style={styles.btnWrap}>
                         <TouchableOpacity
                         style={styles.btn}
                         onPress={()=>setShowNote(false)}
                         >
                             <Text style={{color:'#fff'}}>Cancel</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                         style={styles.btn}
                         onPress={()=>updateNote()}
                         >
                             <Text style={{color:'#fff'}}>OK</Text>
                         </TouchableOpacity>
                     </View>
                  </View>
              </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'rgba(0,0,0,0.3)'
   },
   inside:{
       width:'85%',
       backgroundColor:'#fff'
   },
   input:{
       borderWidth:1,
       width:250,
       height:100,
       borderRadius:10,
       alignItems:'center',
       marginLeft:40,
       marginRight:40,
       marginTop:23,
       marginBottom:18,
       padding:8
   },
   btn:{
       width:80,
       height:40,
       backgroundColor:'#808080',
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       margin:15,
       borderRadius:5
   },
   btnWrap:{
       width:'100%',
       display:'flex',
       flexDirection:'row',
       justifyContent:'flex-end'
   }
})

export default NoteModal
