import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Application from 'expo-application';
import * as Location from 'expo-location';
import { checkStop } from '../services/checador';

const Home = () => {

    const [deviceID, setDeviceID] = useState('');
    const [location, setLocation]  = useState();

    // Para poder sacar el id del dispositivo
    useEffect(() => {
        if (Application.getAndroidId) {
            setDeviceID(Application.getAndroidId);
            console.log(deviceID)
        }else{
            setDeviceID(Application.getIosIdForVendorAsync);
        }
    },[])

    // Permisos para ubicación
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log('Location: ', currentLocation)
        };
        getPermissions();
    },[])
    
    // Para poder transformar la fecha y hora
    const checkNStop = () => {
        checkStop(deviceID).then(
            response => {
                console.log('trans: ', response);
            }
        )
    }

  return (
    <View style = {styles.container}>
        <View style = {styles.containerOptions}>
            <Text style = {styles.title}>Registro</Text>
            <Text style = {styles.text}>ID de dispositivo: {deviceID}</Text>
            <Text style = {styles.text}>Ruta:</Text>
            <Text style = {styles.text}>Parada actual</Text>
            <Text style = {styles.text}>Siguiente parada</Text>
            <TouchableOpacity style={styles.button} onPress={checkNStop}>
                <Text style = {styles.textButton}>Checar</Text>
            </TouchableOpacity>
        </View>
    </View>    
  )
}

export default Home
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    containerOptions:{
        margin: 15,
        padding:20,
        borderRadius:10,
        backgroundColor:'#3333',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize: 30,
        textAlign:'center',
        width: '100%',
        fontWeight:'700',
        marginBottom: 50,
        paddingBottom: 20,
        borderColor:'black',
        borderBottomWidth:3,
        
    },
    text:{
        fontSize:18,
        marginBottom: 10,
    },
    button:{
        backgroundColor:'#333',
        padding:10,
        borderRadius: 15,
        marginTop:10,
        marginBottom: 10,
    },
    textButton:{
        color:'white',
        fontSize: 18,
    }
})