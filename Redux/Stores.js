import { createStore } from 'redux'
import {reducer} from './Reducers'

export default configureStore = () =>{
    const store = createStore(reducer)
    return store
}