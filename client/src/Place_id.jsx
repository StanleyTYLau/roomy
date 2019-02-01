import React from 'react';
import axios from 'axios';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

class Place_id extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      placeData: {}
    };

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount(){
    const placeId = this.props.place_id;
    axios.get(`/places/${placeId}`)
      .then( res => {
        this.setState({placeData: res.data});
        console.log(res.data)
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
                  <p className="small_price">Place info:</p>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <th scope="row">Price:</th>
                        <td>${this.state.placeData.price}</td>
                      </tr>
                      <tr>
                        <th scope="row">Description:</th>
                        <td>{this.state.placeData.description}</td>
                      </tr>
                      <tr>
                        <th scope="row">Neighbourhood:</th>
                        <td>{this.state.placeData.neighbourhood}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address:</th>
                        <td>{this.state.placeData.street_number} {this.state.placeData.street_name}, {this.state.placeData.city}, {this.state.placeData.postal_code}</td>
                      </tr>
                      <tr>
                        <th scope="row">Building Type:</th>
                        <td>{this.state.placeData.type}</td>
                      </tr>
                      <tr>
                        <th scope="row">Parking:</th>
                        <td>{this.state.placeData.parking}</td>
                      </tr>
                      <tr>
                        <th scope="row"># of Baths:</th>
                        <td>{this.state.placeData.parking}</td>
                      </tr>
                      <div># of Baths: {this.state.placeData.number_of_bathrooms}</div>
                      <p>Air condition:</p>
                      <p>Furnished:</p>
                      <p>Laundry</p>
                    </tbody>
                  </Table>
                  <p className="small_price">Owner info:</p>
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

}

export default Place_id;