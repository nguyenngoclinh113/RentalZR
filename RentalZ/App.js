import React, {useEffect, useState} from 'react'
import {  Dimensions, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Icontab from 'react-native-vector-icons/Ionicons'
import Homepage from './Component/Homepage'
import SearchInformation from './Component/SearchInformation'
import Detail from './Component/Detail'
import FullListInformation from './Component/FullListInformation'
import * as SQLite from 'expo-sqlite'
import { createStackNavigator } from '@react-navigation/stack'



const db= SQLite.openDatabase('database','1.0')

export default function App() {
     
      const fullwidth = Dimensions.get('window').width
      const stackNavite = createStackNavigator()
      const bottomTab = createBottomTabNavigator();
      

// biến listRoute
const Search = ()=> { 
    return(
    <stackNavite.Navigator screenOptions={({route})=>({
      headerShown: false
    })}>
      <stackNavite.Screen name="Search" children={()=>(<SearchInformation />)}/>
      <stackNavite.Screen name="Details" component={Detail}/>
    </stackNavite.Navigator>
    )
}
//Database
const TableDB = async() => {
    await db.transaction((tx)=>{
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS mobieapp (
          idData INTEGER PRIMARY KEY AUTOINCREMENT,
          propertypes TEXT,
          bedroom TEXT ,
          createAt TIMESTAMP NOT NULL ,
          monthlyprice TEXT,
          furnituretype TEXT,
          note TEXT,
          report TEXT
      )`,
      )
      console.log('Connect db successfully!')
    })
}
useEffect(() => {
    TableDB()
    
},
[])

  return (
//Screen
    <NavigationContainer>
      <bottomTab.Navigator
       innitialRouteName = "Home"
       screenOptions = {(route) =>({
        // headerTitleAlign: 'center',
        // headerStyle:{backgroundColor:'#1435'},
        // headerTintColor: '#fff'
        headerShown: false
        
       })}
      >
        <bottomTab.Screen
        options= {{
          tabBarLabel: "Home",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'home':'home-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }}
         name="Home" component = {Homepage}/>
        <bottomTab.Screen
        options= {{
          tabBarLabel: "List",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'list':'list-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }}
         name="List" component = {FullListInformation}/>
        <bottomTab.Screen
        options= {{
          tabBarLabel: "Search",
          tabBarIcon: ({color, size,focused})=>{
            let icons;
            icons = focused?'search':'search-outline'
            return (<Icontab name={icons} color={color} size={size}/>)
          }
        }} 
        name="SearchRoute" children= {Search}/>
      </bottomTab.Navigator>
    </NavigationContainer>
  );
}

