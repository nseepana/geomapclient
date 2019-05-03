import React from 'react';

const Map = ({ onEditClick, onDeleteClick, completed, address, lat, lng }) => (
  <article className="col-sm-6 pl-0 pt-3 pb-3">
    <div className="card">
      <div className="card-body">
        <h4>{address}</h4>
        <div>{address}</div>
        <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
      </div>
      <div className="card-footer">
        <button type="button" onClick={onEditClick}>
          Edit
        </button>
        <label>&nbsp;or&nbsp;</label>
        <button type="button" onClick={onDeleteClick}>
          Delete
        </button>
      </div>

    </div>
  </article>
)
export default Map
