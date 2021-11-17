import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import {useIsFocused} from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import  Icon  from 'react-native-vector-icons/Ionicons';
import NoteModal from './Open dialog/NoteModal';
const db= SQLite.openDatabase('database','1.0')
export default function FullInformation() {

  // biến loading để delete
  const[loading, setLoading] = useState(false)
  const[showNote, setShowNote] = useState(false)
  const [id,setId] = useState()
  const deleteData = async(id)=>{
    await db.transaction((tx)=>{
      tx.executeSql("DELETE FROM mobieapp WHERE idData = ?",
      [id],
      (tx,result)=>{
        setLoading(true)
      },
      (error)=>{
        console.log('Cannot delete')
      }
      )
    })
  }
  const getIdEdit = (id)=>{
     setId(id)
     setShowNote(true)
  }
  // biến gọi database
  const isFocused = useIsFocused()
  // biến show database
  const [dataobj, setDataobj] = useState([
  ])
  console.log(dataobj)
  // biến getdata để select
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
                setDataobj(Datalist)
              }
            }else{
              setDataobj([])
            }
          }
          )
        })
  }
  useEffect(()=>{
    getData()
    if(loading){
      setTimeout(()=>{
        setLoading(false)
      },1000)
    }
  },[isFocused, loading])

  return (
    // thẻ View
    <View style={styles.container}>
        <NoteModal showNote={showNote} setShowNote={setShowNote} id={id}/>
        <Text style={styles.Header}>List</Text>
        {dataobj.length===0?(
        <View style={{flex:1 ,alignItems: 'center'}}>
          <Text>Dữ liệu Không Có</Text>
        </View>):(
          <FlatList data={dataobj} keyExtractor={i=>i.idData.toString()} contentContainerStyle={{padding:15,}} renderItem={({item})=>(
            <View style={{marginBottom:18,flexDirection:'row', backgroundColor:'#fff', borderRadius:16, width:280}}>
              <View style={{padding:10, flex:1, }}>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>Name:</Text>
                  <Text style={{marginLeft:5,}}>{item.report}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>Property Types:</Text>
                  <Text style={{marginLeft:5,}}>{item.propertypes}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>BedRooms:</Text>
                  <Text style={{marginLeft:5,}}>{item.bedroom}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>DateTime:</Text>
                  <Text style={{marginLeft:5,}}>{item.createAt}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>Monthly Rent Price:</Text>
                  <Text style={{marginLeft:5,}}>{item.monthlyprice}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                  <Text>Furniture Types:</Text>
                  <Text style={{marginLeft:5,}}>{item.furnituretype}</Text>
                  </View>
                </View>
                <View style={{marginTop:8,display:'flex', flexDirection:'row'}}>
                  <Icon name='pencil' color='green' size={18} style={{marginTop:2}} onPress={()=>getIdEdit(item.idData)}/>
                  <Icon name='close-outline' color='red' size={28} onPress={()=>deleteData(item.idData)} />
                </View>
                
              </View>
          )}/>
        )}
        
    </View> 
  );
}
//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Header: {
    flex: 1,
    marginTop: 15,
    fontSize: 30,
    fontWeight: '400',
  }
});