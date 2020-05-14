import React, {useState} from 'react'
import {View, StyleSheet, Modal, Alert, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {addEmpolyeeAPI, updateEmpolyeeAPI, uploadImageAPI} from '../API'

function CreateEmployee ({navigation, route}) {

    const getDetails = (type) => {
        if(route.params){
            switch(type){
                case 'name':
                    return route.params.name
                case 'phone':
                    return route.params.phone
                case 'email':
                    return route.params.email
                case 'salary':
                    return route.params.salary
                case 'picture':
                    return route.params.picture
                case 'position':
                    return route.params.position
            }
        }
        return ''
    }

    const [name, setName] = useState(getDetails('name'))
    const [phone, setPhone] = useState(getDetails('phone'))
    const [email, setEmail] = useState(getDetails('email'))
    const [salary, setSalary] = useState(getDetails('salary'))
    const [picture, setPicture] = useState(getDetails('picture'))
    const [position, setPosition] = useState(getDetails('position'))
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const postEmpolyee = async() => {
        const newData = {name, phone, email, salary, picture, position}
        try{
            const response = await addEmpolyeeAPI(newData)
            if(response){
                Alert.alert(`${name} is successfully added`)
                navigation.navigate('Home')
            }
            else{throw new Error('failed to add')}
        }
        catch(err){console.log(err)}
    }

    const updateEmpolyee = async() => {
        const id = route.params._id
        const updatedData = {id, name, phone, email, salary, picture, position}
        try{
            const response = await updateEmpolyeeAPI(updatedData)
            if(response){
                Alert.alert(`${name} is successfully updated`)
                navigation.navigate('Home')
            }
            else{throw new Error('failed to update')}
        }
        catch(err){console.log(err)}
    }

    const pickFromGallary = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status === 'granted'){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                qualityity:0.5
            })
            if(!data.cancelled){
                let sep = data.uri.split(".")
                let newFile = {
                    uri:data.uri,
                    type:`test/${sep[sep.length-1]}`,
                    name:`test.${sep[sep.length-1]}`
                }
                handleUpload(newFile)
            }
        }
        else{
            Alert.alert('you should give a permission')
        }
    }

    const pickFromCamera = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if(status === 'granted'){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                qualityity:0.5
            })
            if(!data.cancelled){
                let sep = data.uri.split(".")
                let newFile = {
                    uri:data.uri,
                    type:`test/${sep[sep.length-1]}`,
                    name:`test.${sep[sep.length-1]}`
                }
                handleUpload(newFile)
            }
        }
        else{
            Alert.alert('you should give a permission')
        }
    }

    const handleUpload = async(image)=>{
          try{
              const url = await uploadImageAPI(image)
              setPicture(url)
              setModal(false)
              setLoading(false)
          }
          catch(err){console.log(err)}
    }

    return(
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput 
                    label='name'
                    value={name}
                    onChangeText={ text => setName(text)}
                    placeholder='enter name of employee'
                    theme={{colors:{primary:'#006aff'}}}
                    mode='outlined'
                    style={styles.input}
                    />
                <TextInput 
                    label='phone'
                    value={phone}
                    onChangeText={ text => setPhone(text)}
                    placeholder='enter phone of employee'
                    keyboardType={'numeric'}
                    theme={{colors:{primary:'#006aff'}}}
                    mode='outlined'
                    style={styles.input}
                    />
                <TextInput 
                    label='email'
                    value={email}
                    onChangeText={ text => setEmail(text)}
                    placeholder='enter email of employee'
                    theme={{colors:{primary:'#006aff'}}}
                    mode='outlined'
                    style={styles.input}
                    />
                <TextInput 
                    label='salary'
                    value={salary}
                    onChangeText={ text => setSalary(text)}
                    placeholder='enter salary of employee'
                    theme={{colors:{primary:'#006aff'}}}
                    mode='outlined'
                    style={styles.input}
                    />
                <TextInput 
                    label='position'
                    value={position}
                    onChangeText={ text => setPosition(text)}
                    placeholder='enter position of employee'
                    theme={{colors:{primary:'#006aff'}}}
                    mode='outlined'
                    style={styles.input}
                    />
                {loading ?
                    <ActivityIndicator /> :
                    <Button 
                        icon={picture === '' ? 'upload' : 'check'}
                        mode="contained" 
                        onPress={() => setModal(true)}
                        theme={{colors:{primary:'#006aff'}}}
                        style={styles.input}
                        >
                        photo
                    </Button> }
                {route.params ? 
                    <Button 
                        icon="update" 
                        mode="contained" 
                        onPress={() => updateEmpolyee()}
                        theme={{colors:{primary:'#006aff'}}}
                        style={styles.input}
                        >update</Button> :
                    <Button 
                        icon="content-save" 
                        mode="contained" 
                        onPress={() => postEmpolyee()}
                        theme={{colors:{primary:'#006aff'}}}
                        style={styles.input}
                        >save</Button>                       
                    }

                    <Modal 
                        animationType='slide'
                        transparent={true}
                        visible={modal}
                        onRequestClose={()=> setModal(false)}
                        >
                        <View style={styles.modalView} >
                            <View style={styles.modalBtns}>
                                <Button 
                                    icon="camera" 
                                    mode="contained" 
                                    onPress={() => {pickFromCamera(); setLoading(true)}}
                                    theme={{colors:{primary:'#006aff'}}}
                                    >
                                    take photo
                                </Button>
                                <Button 
                                    icon="image-area" 
                                    mode="contained" 
                                    onPress={() => {pickFromGallary(); setLoading(true)}}
                                    theme={{colors:{primary:'#006aff'}}}
                                    >
                                    choose photo
                                </Button>
                            </View>
                            <Button color='red' onPress={() => {setModal(false); setLoading(false)}}>cancel</Button>
                        </View>
                    </Modal>
        </KeyboardAvoidingView>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    input:{
        margin: 5,
    },
    modalBtns:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%'
    },
})

export default CreateEmployee