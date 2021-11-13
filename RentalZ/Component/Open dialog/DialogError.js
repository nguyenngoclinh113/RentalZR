import React, { useState } from 'react'
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'
const DialogError = ({name, show, setShow}) => {
    const Closemode = ()=>{
        setShow(false)
    }
    return (
      <Modal transparent visible={show}>
          <View style={styles.modelForm}>
              <View style={styles.Boxder}>
                <View style={{alignItems:'flex-end'}}>
                    <View style={styles.Header}>
                    <Icon style={styles.icons} name="close-outline" size={50} color="#000000" onPress={Closemode}/>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Icon style={styles.iconerror} name={name} size={90} color="#CF000F" />
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.content}>You can check again, please. Are you sure everything is fine? You should fill out all the fields.</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={Closemode}>
                        <Text style={styles.textbtn}>OK</Text>
                    </TouchableOpacity>
                </View>
               </View>
          </View>
      </Modal>
    )
}
const styles = StyleSheet.create({
    modelForm:{
        flex:1,
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
    },
    icons:{
        marginTop:-18,
        marginRight:-10
    },
    iconerror: {
        paddingVertical: 8,

    },
    Headers:{
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    Boxder: {
        width: '80%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation:7,
        shadowColor: '#fff',
        shadowOffset: {width:2,height:1},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingVertical: 32,
    },
    btn:{
        width:'100%',
        height: 45,
        backgroundColor: '#CF000F',
        borderRadius: 5,
        elevation:7,
        shadowColor: '#fff',
        shadowOffset: {width:2,height:1},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 25,
        

    },
    textbtn:{
        fontSize: 20,
        letterSpacing: 1.2,
        color: '#fff',
        marginTop: 5,
        marginBottom: 5,
        textAlign:'center'
    },
    content:{
        marginLeft: 7,
        color: '#ACADA8',
        fontSize: 14,
        letterSpacing: 1,
        textAlign:'center',
    }
}) 
export default DialogError