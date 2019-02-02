import React from 'react';
import axios from 'axios';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

class Place_id extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      placeData: {},
      ownerData: {}
    };

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount(){
    const placeId = this.props.place_id;

    axios.post(`/places/${placeId}`, {user_info: this.props.user_info})
      .then( res => {
        this.setState({placeData: res.data.place, ownerData: res.data.owner});
        //console.log(res.data)
      })
  };

  render() {
    return (
      <div>

        <Button id="toggler" onClick={this.toggle} className="button_char">DETAILS</Button>

        <div className="middle_all">
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="pop_windows">
            <ModalHeader className="big_title" toggle={this.toggle}>Owner Matching: {this.state.placeData.matchPercent * 100}%</ModalHeader>
              <Form onSubmit = {this._handleSubmit}>
                <ModalBody>
                  <p className="price">Place info:</p>
                  <div>Price: ${this.state.placeData.price}</div>

                  <div>Address: {this.state.placeData.street_number} {this.state.placeData.street_name}, {this.state.placeData.city}, {this.state.placeData.postal_code}</div>

                  <div>Building Type: {this.state.placeData.type}</div>

                  <div># of Baths: {this.state.placeData.number_of_bathrooms}</div>
                  <p className="price">Owner info:</p>
                  <div>Some Data: {this.state.ownerData.first_name}</div>
                  <div>Some Data: {this.state.ownerData.last_name}</div>
                </ModalBody>
              <ModalFooter>
                <Button type="submit" className="button_char" onClick={this.toggle}>Ask to be Roomys</Button>{' '}
                <Button className="cancel" onClick={this.toggle}>CANCEL</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }

  _handleRequest = e => {
    const placeId = this.props.place_id;
    axios.put(`places/${placeId}`);
  }

}

export default Place_id;