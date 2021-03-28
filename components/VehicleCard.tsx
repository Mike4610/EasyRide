import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import "firebase/firestore";
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {Vehicle} from "../types"
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function VehicleCard({vehicle,handleDeleteVehicle}:{vehicle:Vehicle,handleDeleteVehicle:any}) {
    const RightActions = ({progress , dragX ,vehicle}:{progress:any, dragX:any, vehicle:Vehicle}) => {
        const scale = dragX.interpolate({
          inputRange:[-100,0],
          outputRange:[1,0],
          extrapolate: 'clamp'
        })
        return (
        <TouchableOpacity onPress = {() =>
             handleDeleteVehicle(vehicle)
           }> 
          <View style = {styles.rightAction}>
            <AnimatedIcon name ="trash-outline" size={40} style={[styles.actionIcon, {transform: [{scale}]}]}/>
          </View>
         </TouchableOpacity> 
        )
     };
    return(
    <Swipeable
        renderRightActions = {(progress,dragX) => <RightActions progress={progress} dragX={dragX} vehicle={vehicle} /> }
          >
        <View key={vehicle.licensePlate} style={styles.infoContainer}>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text style={styles.footer_title}>
              {vehicle.brand} {vehicle.model}
            </Text>
          </View>

          <View style={styles.info}>
            <AntDesign name="idcard" size={28} color="#fd4d4d" />
            <Text style={styles.footer_text}>{vehicle.licensePlate}</Text>
          </View>
          <View style={styles.info}>
            <Ionicons name="person-outline" size={24} color="#fd4d4d" />
            <Text style={styles.footer_text}>{vehicle.seats}</Text>
          </View>
        </View>
      </Swipeable>);

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#151a21",
    },
    footer: {
      backgroundColor: "white",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    footer_text: {
      fontSize: 18,
      color: "#151a21",
      marginLeft: 5,
    },
    footer_title: {
      fontSize: 20,
      color: "#151a21",
      fontWeight: "bold",
      marginBottom: 10,
    },
    profileDetails: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      zIndex: -1,
    },
    profileName: {
      color: "#a3a3a3",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 20,
    },
    profilePic: {
      height: 150,
      width: 290,
      marginTop: 20,
    },
    memberSince: {
      color: "#fd4d4d",
      fontSize: 13,
      fontWeight: "bold",
    },
    infoContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: "#a3a3a3",
      borderBottomWidth: 1,
    },
    info: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    buttons: {
      padding: 30,
      display: "flex",
      alignItems: "center",
    },
    rightAction :{
      backgroundColor: '#fd4d4d',
      /* borderTopRightRadius: 30, */
      flex:1,
      alignSelf:"center",
    },  
    actionIcon: {
      color: '#fff',
      alignSelf:'center',
      flex:1,
      padding:20,
  } 
  });
  