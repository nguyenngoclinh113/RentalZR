import React, {useState} from 'react'
import {  Text,TextInput, View,StyleSheet, ScrollView, TouchableOpacity,Alert  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import  IconRoom  from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite'
// biến database
const db= SQLite.openDatabase('database','1.0')

const TextR = ({ setShow, setStatus}) => {

    const [information,setInformation] = useState({
        properTypes: '',
        choiceRoom:null,
        dateAndTime: '',
        priceOfMonthly:null,
        furnitureType:null,
        note:'',
        report:'',
      })

    const onChange =(input)=>(value)=>{
        console.log(value);
        setInformation({...information,[input]:value})
    }
    const onChangePrizeOfMonthly = (value) => {
        if(value > 0 || value === ""){
            setInformation(preState => ({...preState, priceOfMonthly: value}));
        }
        console.log(information.priceOfMonthly);
    }

// biến placeholder
    const placeholder=(form)=> {
        const Placeholder = {
            label:`Choice any ${form}`,
            value: null
        }
        return Placeholder
    }
    
    
// biến insertDB
    const insertDB = async(valueDB)=>{
        const{properTypes,choiceRoom,dateAndTime,priceOfMonthly,furnitureType,note,report} = valueDB
            await db.transaction((tx)=>{
                tx.executeSql(
                    `INSERT OR IGNORE INTO mobieapp(
                        propertypes,
                        bedroom,
                        createAt,
                        monthlyprice,
                        furnituretype,
                        note,
                        report
                      )
                      VALUES (
                        ?,?,?,?,?,?,?
                      )`,
                      [properTypes,choiceRoom,dateAndTime,priceOfMonthly,furnitureType,note,report],
                      (tx,result)=>{
                        console.log('insertDB successfully!');
                        console.log(result);
                        if(result.rowsAffected < 1){
                            Alert.alert(
                                "Alert Title",
                                `You can not add by the record is existed in the database`,
                                [
                                   
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                             );
                        }else{
                            console.log("insert ok")
                            setShow(true)
                            setStatus('')
                        }
                    }
                )
            })
    }
   
     
// biến submit
    const submmit = (giatri) => {
        if(!giatri) return
        if(giatri.properTypes ==="" || giatri.report ===""){
            setShow(true)
            setStatus('error')
        }else if(giatri.choiceRoom === null ||  giatri.priceOfMonthly ===null || giatri.dateAndTime ===null){
            setShow(true)
            setStatus('error')
        }
        else{
           
            insertDB(giatri)
            setInformation({
                properTypes: '',
                choiceRoom:null,
                dateAndTime: null,
                priceOfMonthly:null,
                furnitureType:null,
                note:'',
                report:'',
              })
        }
    }
 // thẻ view
    return (
    <View style={styles.wrapperForm} >
        <ScrollView contentContainerStyle={styles.Rolling}>
            <View style={styles.ViewRoll}>
        <Text style={styles.SeenView}>Property type</Text>
        <TextInput
        style={styles.textIputs} 
        name="properTypes" 
        value={information.properTypes} 
        onChangeText={onChange('properTypes')}/>
        <Text style={styles.SeenView}>BedRooms</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder = {placeholder('Bedrooms')}
            style={stylesForms}
            value={information.choiceRoom}
            onValueChange={(value) => setInformation({...information,choiceRoom:value})}
            items={[
                { label: 'Studio', value: 'Studio' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4+', value: '4+' },
            ]}
            Icon={()=>{
                return(<IconRoom name='chevron-down-circle-outline' color='black' size={23} style={{
                    marginTop: 14,
                    marginRight: 5,
                }}/>)
            }}
        />
        <Text style={styles.SeenView}>DateTime</Text>
        <TextInput
        style = {styles.textIputs}
        placeholder  = {"YYYY-MM-DD"}
        onChangeText = {onChange("dateAndTime")}
        name = {"dateAndTime"}
        />
        <Text style={styles.SeenView}>Monthly Rent Price</Text>
        <TextInput
        keyboardType='numeric'
        placeholder= "Please enter monthly rental price"
        style={styles.textIputs} 
        name="priceOfMonthly"
        value={information.priceOfMonthly} 
        onChangeText={value => onChangePrizeOfMonthly(value)}/>
        <Text style={styles.SeenView}>Furniture Types</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            value={information.furnitureType}
            placeholder = {placeholder('Furniture Types')}
            style={stylesForms}
            onValueChange={(value) => setInformation({...information,furnitureType:value})}
            items={[
                { label: 'Furnished', value: 'Furnished' },
                { label: 'Unfurnished', value: 'Unfurnished' },
                { label: 'Part Furnished', value: 'Part Furnished' },
                { label: ' Student', value: 'Student'}, 
                { label: ' Senior', value: 'Senior'},
                { label: ' Loveseat', value: 'Loveseat'},
            ]}
            Icon={()=>{
                return(<IconRoom name='chevron-down-circle-outline' color='black' size={23} style={{
                    marginTop: 14,
                    marginRight: 5,
                }}/>)
            }}
        />
        <Text style={styles.SeenView}>Notes</Text>
        <TextInput
        placeholder="If there is anything please make a note"
        style={styles.textIputs} 
        name="note" 
        value={information.note} 
        onChangeText={onChange('note')}
        multiline={true}
        />
     
          
        <Text style={styles.SeenView}>Name Of The Reporter</Text>
        <TextInput
        placeholder="Please enter your name!"
        style={styles.textIputs} 
        name="report" 
        value={information.report} 
        onChangeText={onChange('report')}/>
        
        </View>
        </ScrollView>
        <View style={styles.SeenView2}>
            <TouchableOpacity 
            style={styles.PressButtion}
            onPress={()=>submmit(information)}
            >
                    <Text style={styles.Text2}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    )
}
// stylesheet
const styles = StyleSheet.create({
    wrapperForm:{
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
    },
    textIputs:{
        height:40, 
        width:280, 
        borderRadius:2,
        padding:10,
        borderColor:'black', 
        borderStyle:'solid', 
        borderWidth:1, 
        marginTop:8,
    },
    SeenView:{
        marginTop: 7,
        
    },
    ViewRoll:{
        display:'flex',
        padding:16,
        flexDirection:'column',
    },
    SeenView2:{
        alignItems: 'center',
        width:'100%'
    },
    PressButtion:{
        width: 165,
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius:4,
        borderColor: 'black',
        backgroundColor: '#00bfff',
        height: 52,
        marginBottom:40
    },
    Text2:{
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 15,
    }
})
const stylesForms = StyleSheet.create({
    inputAndroid: {
        fontSize: 14,
        borderColor: 'black',
        paddingHorizontal: 9,
        paddingVertical: 7,
        borderWidth: 1,
        paddingRight: 30,
        marginTop:5,
        borderRadius: 3,
        color: 'black',
        
      },
  });
export default TextR