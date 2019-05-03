import React, {Component} from 'react'
import { connect } from 'react-redux';
import { editMap, deleteMap, fetchMaps } from '../actions'
import Map from '../components/Map'


class MapList extends Component{
  constructor(props){
    super(props);
    this.props.fetchMaps()
    
  }

  render(){
    let data = this.props.maps.data || [];
    
    return(<ul>
      {data.map(geomap =>
        <Map
          key={geomap._id}
          {...geomap}
          onEditClick={() => this.props.editMap(geomap)}
          onDeleteClick={() => this.props.deleteMap(geomap)}
        />
      )}
  </ul>)
  }
}

const mapStateToProps = state => ({maps: state.maps})


export default connect(
  mapStateToProps,
  {deleteMap, editMap, fetchMaps}
)(MapList)
