import React from 'react';

const Form = ({ handleSubmit, addressRef, latRef, lngRef, mapdata = {}, buttonLabel }) => {
    console.log(mapdata);
    return (
        <form onSubmit={handleSubmit} key={mapdata._id || mapdata.address}>
            <div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Address: </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="text"
                            ref={addressRef}
                            defaultValue={mapdata.address || ''} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Latitude: </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number"
                            ref={latRef}
                            defaultValue={mapdata.lat || ''}
                            step="0.0000000000000001"
                            min='-90'
                            max='90' required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Latitude: </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number"
                            ref={lngRef}
                            defaultValue={mapdata.lng || ''}
                            step="0.0000000000000001"
                            min='-180'
                            max='180' required />
                    </div>
                </div>

                <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10 fr">
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Form
