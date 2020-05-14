import React from 'react'
import {View, Text, StyleSheet, Image, Linking, Platform, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {Card, Title, Button} from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import {deleteEmployeeAPI} from '../API'

function Profile ({route, navigation}) {
    const {_id, name, email, phone, picture, salary, position} = route.params.item
    
    const deleteEmployee = async() =>{
       try{
           const response =await deleteEmployeeAPI(_id)
           if(response){
            Alert.alert(`${name} is successfully fired`)
            navigation.navigate('Home')
           }
           else{throw new Error('failed to delete')}
       }
       catch(err){console.log(err)}
    }

    const onDial = () =>{
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt: ${phone}`)
        }
    }

    const sendEmail = () =>{
        Linking.openURL(`mailto:${email}`)
    }

    return(
        <View style={styles.container}>
            <LinearGradient 
                colors={['#99ebff', '#ccf5ff']}
                style={{height:'20%'}}
                />

            <Image 
                style={styles.image}
                source={{uri:picture}}
                />

            <View style={styles.titleView}>
                <Title>{name}</Title>
                <Text>{position}</Text>
            </View>

            <View style={{height:'8%'}}>
                <Card style={styles.cardView} onPress={() => sendEmail()}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name='email' size={40} color='#dd5fdd' />
                        <Text style={{fontSize:22, paddingLeft:5}}>{email}</Text>
                    </View>
                </Card>                
            </View>

            <View style={{height:'8%'}}>
                <Card style={styles.cardView} onPress={() => onDial()}>
                    <View style={{flexDirection:'row'}}>
                        <Entypo name='phone' size={40} color='#dd5fdd' />
                        <Text style={{fontSize:22, paddingLeft:5}}>{phone}</Text>
                    </View>
                </Card>                
            </View>

            <View style={{height:'8%'}}>
                <Card style={styles.cardView}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name='attach-money' size={40} color='#dd5fdd' />
                        <Text style={{fontSize:22, paddingLeft:5}}>{salary}</Text>
                    </View>
                </Card>                
            </View>

            <View style={{height:'8%'}}>
                <Card style={styles.cardView}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialIcons name='account-box' size={40} color='#dd5fdd' />
                        <Text style={{fontSize:22, paddingLeft:5}}>{position}</Text>
                    </View>
                </Card>                
            </View>

            <View style={{flexDirection:'row', alignItems:'space-around'}}>
                <Button
                    icon="account-edit" 
                    mode="contained" 
                    onPress={() => navigation.navigate('CreateEmployee',{
                        _id, name, email, phone, picture, salary, position
                    })}
                    theme={{colors:{primary:'#00ccff'}}}
                    style={{margin:5}}
                    >
                    Edit
                </Button>
                <Button
                    icon="delete-forever" 
                    mode="contained" 
                    onPress={() => deleteEmployee()}
                    theme={{colors:{primary:'#00ccff'}}}
                    style={{margin:5}}
                    >
                    Fire Employee
                </Button>     
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    lg:{
        height:'20%',
    },
    image:{
        width:160, 
        height:160, 
        borderRadius:160/2, 
        alignSelf:'center', 
        marginTop:-30,
    },
    titleView:{
        height:'8%', 
        alignItems:'center',
    },
    cardView:{
        paddingLeft:5, 
        backgroundColor:'#e6faff',
    },
  })

export default Profile