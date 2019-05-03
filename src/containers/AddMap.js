import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMap, updateMap } from '../actions';
import Form from '../components/Form';
import ActionType  from '../actions/types';

class AddMap extends Component {
    constructor(props) {
        super(props);

        this.state = { showAddForm: false };

        this.addressRef = React.createRef();
        this.latRef = React.createRef();
        this.lngRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevstate) {
        console.log(nextProps);
        let isEdit = (nextProps.type === ActionType.EDIT);
        if (isEdit) {
            return {
                showAddForm: isEdit
            }
        }
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { addMap, updateMap, map, type } = this.props;
        let values = {
            "address": this.addressRef.current.value,
            "lat": parseFloat(this.latRef.current.value),
            "lng": parseFloat(this.lngRef.current.value)
        }

        if (type === ActionType.EDIT) {
            updateMap({ ...values, "_id": map._id})
        } else {
            addMap(values)
        }
    }

    handleAddClick = () => {
        this.setState({ showAddForm: true });
    }

    render() {

        const { showAddForm } = this.state;
        const { map, type } = this.props;
        
        if (!showAddForm) {
            return (<div>
                <button type="button" className="btn btn-primary"
                    onClick={this.handleAddClick}>
                    Add Location
            </button>
            </div>);
        }

        return (
            <Form
                handleSubmit={this.handleSubmit}
                addressRef={this.addressRef}
                latRef={this.latRef}
                lngRef={this.lngRef}
                mapdata={map}
                buttonLabel={(type === ActionType.EDIT) ? 'Update' : 'Add'}></Form>
        )
    }


}

const mapStateToProps = state => {
    return {"map":state.maps.actionData || {}, "type": state.maps.type}
}

export default connect(mapStateToProps, { addMap, updateMap })(AddMap)
