
import ActionType from '../actions/types'

const maps = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case ActionType.ADD:
      return {"data": [
        ...state.data,
        action.payload
      ], "type": ActionType.ADD, "added": action.payload}
    case ActionType.FETCH:
      return {"data":action.payload, "type": action.type};

    case ActionType.EDIT:
      return {
        "data": state.data.map((geomap) => geomap._id === action.payload._id ? { ...geomap, editing: true } : { ...geomap, editing: false }),
        "actionData": action.payload,
        "type": action.type
      }
    case ActionType.UPDATE:
      return{
        "data": state.data.map((geomap) => geomap._id === action.payload._id ? { ...action.payload, editing: true } : { ...geomap, editing: false }),
        "actionData": action.payload,
        "type": action.type
      }

    case ActionType.DELETE:
    
      return{
        "data": state.data.filter((geomap) => geomap._id !== action.payload._id),
        "_id": action.payload._id,
        "type": action.type
      }
    default:
      return state
  }
}

export default maps
