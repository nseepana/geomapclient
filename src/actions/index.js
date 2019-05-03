import axios from 'axios';
import * as ActionCreator from './creators';

export const addMap = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/add", { "address": data.address, "lat": data.lat, "lng": data.lng });
        dispatch(ActionCreator.added(res.data.response));
    } catch (e) {
        alert(e.message)
    }
}

export const updateMap = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/update", { "_id": data._id, "address": data.address, "lat": data.lat, "lng": data.lng });
        dispatch(ActionCreator.updated(res.data.response));
    } catch (e) {
        alert(e.message)
    }
}

export const deleteMap = (map) => async dispatch => {
    try {
        console.log(map)
        const res  = await axios.post("/api/delete", { "_id": map._id });
        dispatch(ActionCreator.deleted(map, ));
    } catch (e) {
        alert(e.message)
    }
}

export const fetchMaps = () => async dispatch => {
    try {
        const res = await axios.get("/api/all", {});
        dispatch(ActionCreator.fetched(res.data.response));
        // return res.data.response;
    } catch (e) {
        alert(e.message)
    }
}

export const editMap = (map) => dispatch => {
    dispatch(ActionCreator.edited(map));
}
