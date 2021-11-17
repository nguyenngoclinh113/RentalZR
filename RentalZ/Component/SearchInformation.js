import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite'
import {useIsFocused,useNavigation} from '@react-navigation/native'

const db= SQLite.openDatabase('database','1.0')
export default function Search() {
  const [find, setFind] = useState('')
  const [data, setData] = useState([])
  const [datafind, setDatafind] = useState([])
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const onfind = (value)=>{
    if(value.length===0){
      setDatafind(data)
      setFind(value)
    }else{
      const newDataFind = data.filter((item)=>{
        const itemFind = item.propertypes?item.propertypes.toUpperCase():''.toUpperCase()
        const valueFind = value.toUpperCase()
        return itemFind.indexOf(valueFind)>-1
      })
      setDatafind(newDataFind)
      setFind(value)
    }
  }
  const findObjDetail = (idDetail)=>{
    const objDetail = datafind.find(item=>item.idData === idDetail)
    navigation.navigate('Details',{objInfo:objDetail})
  }
  // get all data
  const getData = async()=> {
    await db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM mobieapp",
      [],
      (tx,result)=>{
        let Datalist = []
        const len = result.rows.length
        if(len>0){
          for(let i=0;i<len;++i){
            Datalist.push(result.rows.item(i))
            setDatafind(Datalist)
            setData(Datalist)
          }
        }else{
          setDatafind([])
          setData([])
        }
      }
      )
    })
}
useEffect(() => {
  getData()

  return ()=>!isFocused
}, [isFocused])
  return (
    
    <View style={styles.container}>
        <TextInput
        style={styles.TINPUT} 
        placeholder='what are you looking for?'
        onChangeText={(value)=>onfind(value)}
        value={find}/>
        <View style={styles.Border}/>
        <View style={{flex:1}}>
          {datafind.length===0?(
            <Text>No data</Text>
          ):(
            <FlatList
            data={datafind}
            keyExtractor={(item)=>item.idData.toString()}
            contentContainerStyle={{padding:20}}
            renderItem={({item})=>(
              <TouchableOpacity
              onPress={()=>findObjDetail(item.idData)}
              style={styles.Wrap}>
                <View style={{flexDirection:'row'}}>
                <Text>Property Types:</Text>
                <Text>{item.propertypes}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>BedRooms:</Text>
                <Text>{item.bedroom}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>DateAndTime:</Text>
                <Text>{item.createAt}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>Monthly Price:</Text>
                <Text>{item.monthlyprice}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>Furniture Types:</Text>
                <Text>{item.furnituretype?item.furnituretype:"none"}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>Reporter:</Text>
                <Text>{item.report}</Text>
                </View>

              </TouchableOpacity>
            )}
            />
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TINPUT:{
    width: 310,
    height:48,
    borderWidth: 1,
    borderRadius:15,
    marginTop:60,
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    flex: 1,
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',

  },
  Border:{
    height:1,
    width:'80%',
    backgroundColor:'#6B6B6B',
    marginTop: 18,
  },
  Wrap:{
    marginBottom:18,
    flexDirection:'column',
    borderRadius:14,
    backgroundColor:'#fff',
    shadowColor:'#000',
    shadowOpacity:0.7,
    shadowOffset:{width:4,height:8},
    marginTop:12,
    elevation:10,
    shadowRadius:16,
    width:300,
    padding: 23,
  }
});