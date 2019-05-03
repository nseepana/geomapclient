import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addMap } from '../actions';
import ActionType from '../actions/types';

//Ref: https://developers.google.com/maps/documentation/javascript/examples/marker-remove

class GeoLocation extends Component {
	constructor(props) {
		super(props)
		this.state = {markers : {hasData: false}};
		this.elmMap = React.createRef();
	}

	componentDidUpdate(prevProps) {
		let maps = this.props.maps;
		if (maps.data !== prevProps.maps.data) {
			switch(maps.type){
				case ActionType.UPDATE:
					this.updateMarker(maps.updated);
					break;
				case ActionType.ADD:
					this.addMarker(maps.added);
					break;
				case ActionType.DELETE:
				 	this.deleteMarker(maps._id);
					break;
					default:
			}
		}
		this.addScript();
	}

	initMap() {
		const google = window.google;
		let maps = this.props.maps.data || [];
		let isDefault = false;
		
		if(maps && !maps.length){
			maps = this.props.mapdata;
			isDefault = true;
		}
		let latLng = maps[0] || {};
		var intialLoc = { lat: latLng.lat, lng: latLng.lng };
		this.geomap = new google.maps.Map(this.elmMap.current, {
			zoom: 7,
			center: intialLoc,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		this.geomap.addListener('click', (event) => {
			this.getAddress({ lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng()) })
			this.addMarker(event.latLng);
		});

		if(!isDefault){
			this.addAllMarkers(maps);
		}
	}

	getAddress(latlng) {
		const google = window.google;
		let geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'location': latlng }, (results, status) => {
			if (status === 'OK') {
				let data = results[0];
				if (data) {
					this.props.addMap({ ...latlng, address: data.formatted_address });
				}
			}
		})
	}
	addScript() {
		let script = document.getElementById('GoogleAPI$Script$Map');
		if (!script) {
			let script = document.createElement('script');
			script.src = process.env.REACT_APP_GEOCODING_API;
			script.id = 'GoogleAPI$Script$Map';
			script.onload = () => {
				this.initMap()
			}
			document.body.appendChild(script);
		}
	}
		// Adds a marker to the map and push to the array.
	addMarker(map) {
			const google = window.google;
			var marker = new google.maps.Marker({
				position: map,
				map: this.geomap
			});
			this.updateState(map._id, marker)
	}

	updateMarker(map){
		this.deleteMarker(map._id);
		this.addMarker(map);
	}

	deleteMarker(_id){
			if(this.state.markers[_id]){
				this.state.markers[_id].setMap(null);
			}
	}

	updateState(_id, marker){
		this.setState({"markers": { ...this.state.markers, [_id]: marker}})
	}

	// Sets the map on all markers in the array.
	addAllMarkers(maps) {
		const google = window.google;
		for (let i = 0, geomap = this.geomap, len = maps.length; i < len; i++) {
			let oMap =  maps[i];
			const { lat, lng, _id } =oMap;
			let loc = { 'lat': lat, 'lng': lng };
			let marker = new google.maps.Marker({
				position: loc,
				map: geomap
			});
			this.updateState(_id, marker)
		}
	}

	render() {
		return (
			<Fragment>
				<div id="map" ref={this.elmMap}></div>
			</Fragment>
		)
	}
}

GeoLocation.defaultProps = {
	mapdata: [{
		address: 'India',
		lat: 20,
		lng: 78
	}]
}

export default connect((state) => {console.log(state); return state} , { addMap })(GeoLocation);