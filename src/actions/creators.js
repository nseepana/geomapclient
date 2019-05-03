import ActionType  from '../actions/types'

export function added(data){
    return {
        type: ActionType.ADD,
        payload: data
    }
}

export function fetched(data){
   
    return {
        type: ActionType.FETCH,
        payload: data
    }
}

export function edited(data){
    return {
        type: ActionType.EDIT,
        payload: data
    }
}


export function deleted(data){
    return {
        type: ActionType.DELETE,
        payload: data
    }
}

export function updated(data){
    return {
        type: ActionType.UPDATE,
        payload: data
    }
}