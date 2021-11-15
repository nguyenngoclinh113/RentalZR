import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons'
import { FUR_OPTIONS } from '../../constants/furnishedOptions';
import { ROOM_OPTIONS } from '../../constants/roomOptions';
import ErrorMessage from '../ErrorMes/ErrorMessage';
import TimePicker from '../TimePicker/TimePicker';
import { pickerStyles, styles } from './styles';
import { isValidate } from './isValidate';
import dbSqlite, { db } from '../../../configs/dbOpen';

const EditForm = ({dataObj,setEditVisible,setStatus}) => {
    const {createdAt,price,updatedAt,monthlyPrice,propertyType,furTypes} = dataObj
    const dataObjNew = {...dataObj,dateTime:createdAt,price:monthlyPrice.toString(),property:propertyType,furType:furTypes}

    const [values,setValues] = useState(dataObjNew)
    console.log(values)
    const [error,setError]  = useState({})
    const [dateEdit,setDateEdit] = useState(new Date(updatedAt))

    const boderColorSelectbedRoom = error.bedRoom?'#CF000F':'#000000'
     // update Data
    const updateData = async(value)=>{
        const {property,bedRoom,dateTime,price,furType,note,name,updatedAt,id}=value
        const parsePrice = parseFloat(price)
       await db.transaction((tx)=>{
            tx.executeSql(`UPDATE rentalDatabase SET 
            propertyType=?, 
            bedRoom=?,
            createdAt=?,
            monthlyPrice=?,
            furTypes=?,
            note=?,
            name=?,
            updatedAt=?
            WHERE id = ? `,
            [property,bedRoom,dateTime,parsePrice,furType,note,name,updatedAt,id],
            (tx,result)=>{
             setTimeout(()=>{
                 setStatus('success')
             },3000)
             console.log('update oke')
            },
            (error)=>{
                console.log('loi update')
                setTimeout(()=>{
                    setStatus('errorUpdate')
                },3000)
            }
            )
        })
    }
    //onChange
    const onChange = (name)=>(value)=>{
         setValues({...values,[name]:value})

         if(value !== "" || value!==null){
             setError((pre)=>{
                 return{...pre,[name]:null}
             })
         }

    }
    
   
    const submit = (value)=>{
        const parsePrice = parseFloat(value.price)>0
        if(isValidate(values,setError)){
            console.log('have error')
            setStatus('error')
            setEditVisible(true)
        }
        
        if(value.name !== ''
        && value.price!=='' 
        &&value.bedRoom!==null
        &&value.property!==''
        &&value.property.match(/^[a-zA-Z\s]*$/)
        &&value.dateTime !== ''
        &&value.property.length<25
        &&value.name.length<20
        &&value.name.match(/^[a-zA-Z\s]*$/)
        &&value.price.match(/^-?[0-9][0-9,\.]+$/)
        &&parsePrice
        ){
            setEditVisible(true)
            setStatus('loading')
            updateData(value)
            console.log('no loi')
        }
    }
    const placeholder=(name)=> {
        const objPlaceHolder = {
            label:name,
            value:null
        }
        return objPlaceHolder
    }
    return (
        <View style={styles.formInside}>
        <Text style={styles.label}>Property Type</Text>
        <TextInput
            style={[styles.input,{borderColor:error.property?'#CF000F':'#000000'}]}
            value={values.property}
            placeholder="Enter Property Types here ...."
            onChangeText={onChange('property')}
        />
        {!error.property?null:(
            <ErrorMessage error={error.property}/>
        )}
        <Text style={styles.label}>Bed Rooms</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerStyles(boderColorSelectbedRoom)}
            value={values.bedRoom}
            onValueChange={onChange('bedRoom')}
            placeholder={placeholder('Choose any kind of Bed Room...')}
            items={ROOM_OPTIONS}
            Icon={()=>(
                <Icon style={{marginTop:17,marginBottom:5,marginRight:7}}
                name="chevron-down-outline" size={24} color="black"
                 />
            )}
        />
        {!error.bedRoom?null:(
            <ErrorMessage error={error.bedRoom}/>
        )}
        <Text style={styles.label}>Date and Time</Text>
        <TimePicker 
        values={values} 
        setValues={setValues} 
        setError={setError} 
        error={error}
        date={dateEdit}
        setDate={setDateEdit}
        />
        {!error.dateTime?null:(
            <ErrorMessage error={error.dateTime}/>
        )}
        <Text style={styles.label}>Monthly Price</Text>
        <TextInput
            style={[styles.input,,{borderColor:error.price?'#CF000F':'#000000'}]}
            keyboardType="numeric"
            value={values.price}
            onChangeText={onChange('price')}
            placeholder="Enter Monthly Price here ...."
        />
        {!error.price?null:(
            <ErrorMessage error={error.price}/>
        )}
        <Text style={styles.label}>Furniture Type</Text>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerStyles()}
            value={values.furType}
            onValueChange={(value)=>setValues({...values,furType:value})}
            placeholder={placeholder('Choose any kind of Furniture Type...')}
            items={FUR_OPTIONS}
            Icon={()=>(
                <Icon style={{marginTop:17,marginBottom:5,marginRight:7}}
                name="chevron-down-outline" size={24} color="black"
                 />
            )}
        />
        <Text style={styles.label}>Note</Text>
        <TextInput
        style={styles.textArea}
        placeholder="Write down your note ...."
        multiline
        value={values.note}
        onChangeText={(value)=>setValues({...values,note:value})}
        numberOfLines={15}
        textAlignVertical = "top"
        />
        <Text style={styles.label}>Reporter</Text>
        <TextInput
            style={[styles.input,,{borderColor:error.name?'#CF000F':'#000000'}]}
            value={values.name}
            onChangeText={onChange('name')}
            placeholder="Enter Your Name here ...."
        />
        {!error.name?null:(
            <ErrorMessage error={error.name}/>
        )}
        <View style={styles.ctBar}>
            <View style={styles.bar}></View>
        </View>
        <TouchableOpacity
        style={styles.pressBtn}
        onPress={()=>submit(values)}
        >
                    <Text style={styles.text}>UPDATE</Text>
        </TouchableOpacity>
        </View>
    )
}


export default EditForm