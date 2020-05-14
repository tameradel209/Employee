import React, { useEffect } from 'react'
import { Text, StyleSheet, Image, View, FlatList, Alert } from 'react-native'
import { Card, FAB } from 'react-native-paper'
import {useSelector, useDispatch} from 'react-redux'
import {fetchDataAPI, deleteEmployeeAPI} from '../API'
import Swipeout from 'react-native-swipeout'

function Home ({navigation}){

    const {data, loading} = useSelector(state => state)
    
    const dispatch = useDispatch()
    
    const fetchData = async() => {
        try{
            const data = await fetchDataAPI()
            dispatch({type:'GET_EMPLOYEES', payload:data})
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteEmployee = async(id, name) =>{
        try{
            const response =await deleteEmployeeAPI(id)
            if(response){
             Alert.alert(`${name} is successfully deleted`)
            }
            else{throw new Error('failed to delete')}
        }
        catch(err){console.log(err)}
     }

    const renderList = ({item}) => {

        const rightButton = [{
            text: 'DELETE',
            type: 'delete',
            onPress: ()=>{
                Alert.alert(
                    'Delete Employee', 
                    'do you want to delete '+item.name+' ?',
                    [
                        {
                            text:'cancel',
                            onPress:() => console.log('cancel deletion'),
                            style:' cancel',
                        },
                        {
                            text:'ok',
                            onPress: () => deleteEmployee(item._id, item.name)
                        }
                    ]
                    )
                }
        }]

        return(
            <Swipeout right={rightButton} autoClose >
                <Card style={styles.myCard} onPress={() => navigation.navigate('Profile', {item:item})}>
                    <View style={{flexDirection:'row'}}>
                        <Image 
                            style={{height:50, width:50, borderRadius:50/2}}
                            source={{uri: item.picture}}
                            />
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.innerText}>{item.name}</Text>  
                            <Text style={styles.innerText}>{item.phone}</Text>                   
                        </View>
                    </View>
                </Card>                
            </Swipeout>

        )
    }

    return(
        <View style={{flex:1}}>
            <FlatList 
                data={data}
                renderItem={({item}) => renderList({item})}
                keyExtractor={(item) => item._id.toString()}
                onRefresh={() => fetchData()}
                refreshing={loading}
                />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:'#006aff'}}}
                onPress={() => navigation.navigate('CreateEmployee')}
                />        
        </View>

    )
}

const styles =StyleSheet.create({
    myCard:{
        margin:5,
    },
    innerText:{
        marginLeft:5,
        fontSize:18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home