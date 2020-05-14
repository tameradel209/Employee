import * as ActionTypes from './ActionTypes'

const INIT_DATA = {data:[], loading:true, error:null}

export const reducer = (state=INIT_DATA, action) => {
    switch(action.type){
        case ActionTypes.LOADING:
            return { ...state, data:[], loading:true, error:null}

        case ActionTypes.GET_EMPLOYEES:
            return { ...state, data: action.payload,  loading:false, error:null}

        case ActionTypes.ERROR:
            return { ...state, data:[], loading:false, error:action.payload}

        default :
            return state
    }
}