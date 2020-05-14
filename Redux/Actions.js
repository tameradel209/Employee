import * as ActionTypes from './ActionTypes'
import {getEmployees} from '../API'
import {useDispatch} from 'react-redux'

const dispatch = useDispatch()

export const getEmployeesAction = async () =>{
    dispatch({type:ActionTypes.LOADING})
    try{
        const data = await getEmployees()
        dispatch(recieveData(data))
        }
    catch(err){ 
        dispatch(errFetch(err)) 
    }
}

const recieveData = (data) => ({
    type: ActionTypes.GET_EMPLOYEES,
    payload: data
})

const errFetch = (err) => ({
    type: ActionTypes.ERROR,
    payload: err
})