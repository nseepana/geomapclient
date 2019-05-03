import React from 'react';
import './App.css'
import GeoLocation from './GeoLocation';
import AddMap from '../containers/AddMap';
import MapList from '../containers/MapList';


const App = ()=>{
  
      return(
        <div className="row map-row">
          <div className="col-6">
            <GeoLocation></GeoLocation>
          </div>
          <div className="col-6">
            <AddMap />
            <MapList />
          </div>
        </div>)

}



export default App
