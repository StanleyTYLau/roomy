import React from 'react';
import axios from 'axios';
import Geocode from "react-geocode";
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

// function Display(props) {
//   if (props.type === 1) {
//     return (

//       );
//   } else if (props.type === 2) {
//     return (
//       <div>
//         <p>Email</p>
//         <p>Password</p>
//       </div>
//       );
//   }
// }

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: true,
      modal2: false,
      postalCode: '',
      streetNumber: '',
      streetName: '',
      unitNumber: '',
      neighbourhood: '',
      buildingType: '',
      price: '',
      description: '',
      bathrooms: '',
      laundry: 'false',
      furnished: 'false',
      ac: 'false',
      parking: 'false'

      

    };

    
  }



  


  render() {
    return (
      <div>
        <div className="registe_place">
          <Modal isOpen={this.state.modal1} toggle={this.toggle} className="pop_windows">
            <ModalHeader toggle={this.toggle}>Please, fill out the form</ModalHeader>
              <Form onSubmit = {this._handleSubmit}>
                <ModalBody>

                  <FormGroup row>
                    <Label for="PostalCode" sm={3}>Postal Code</Label>
                    <Col sm={9}>
                      <Input type="text" name="PostalCode" id="formPostalCode" placeholder="PostalCode" onChange={this._handlePostalCode} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="StreetNumber" sm={3}>Street Number</Label>
                    <Col sm={9}>
                      <Input type="number" min="0" name="StreetNumber" id="formStreetnumber" placeholder="Street Number" onChange={this._handleStreetNumber} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="StreetName" sm={3}>Street Name</Label>
                    <Col sm={9}>
                      <Input type="text" name="StreetName" id="formStreetName" placeholder="Street Name" onChange={this._handleStreetName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="UnitNumber" sm={3}>Unit Number</Label>
                    <Col sm={9}>
                      <Input type="text" name="UnitNumber" id="formUnitNumber" placeholder="Unit Number" onChange={this._handleUnitNumber} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="areaSelect" sm={3}>Neighbourhood</Label>
                    <Col sm={9}>
                      <Input type="select"  name="areaSelect" id="areaSelect" onChange={this._handleNeighbourhood} >
                        <option>Downtown</option>
                        <option>East End</option>
                        <option>East York</option>
                        <option>Etobicoke</option>
                        <option>Midtown</option>
                        <option>North York</option>
                        <option>Scarborough</option>
                        <option>Uptown</option>
                        <option>West End</option>
                        <option>York-Crosstown</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="typeSelect" sm={3}>Type of Building</Label>
                    <Col sm={9}>
                      <Input type="select" name="typeSelect" id="typeSelect" onChange={this._hanldeType} >
                        <option>Appartment Building</option>
                        <option>Condo</option>
                        <option>Private House</option>
                      </Input>
                    </Col>
                  </FormGroup>
                
                </ModalBody>



              <ModalFooter>
                <Button className="button_char" onClick={this._handleClose}>NEXT</Button>{' '}
                <Button className="cancel" onClick={this.toggle}>CANCEL</Button>
              </ModalFooter>
            </Form>
          </Modal>


          <Modal isOpen={this.state.modal2} toggle={this.toggle} className="pop_windows">
            <ModalHeader toggle={this.toggle}>Please, fill out the form</ModalHeader>
              <Form onSubmit = {this._handleSubmit}>
                <ModalBody>
                <FormGroup row>
                    <Label for="price" sm={3}>Price</Label>
                    <Col sm={9}>
                      <Input type="text" name="price" id="formPrice" placeholder="Please indicate the price" onChange={this._handlePrice} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="description" sm={3}>Description</Label>
                    <Col sm={9}>
                      <Input type="textarea" onChange = {this._handleDescription} />
                      {/* <Input type="text" name="description" id="formDescription" placeholder="Short description of the room" onChange={this._handleFirstName} required /> */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="bathrooms" sm={3}>Bathrooms</Label>
                    <Col sm={9}>
                      <Input type="number" min="0" name="bathrooms" id="formBathrooms" placeholder="Number of bathrooms" onChange={this._handleBathrooms} required />
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Label for="laundry" sm={3}>Laundry on site</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="laundrySwitch" name="laundrySwitch" label="Turn on if you have a laundry on site" onClick = {this._handleLaundry} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="furnishedCheckbox" sm={3}>Furnished</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="furnishedSwitch" name="furnishedSwitch" label="Turn on if the room is furnished" onClick = {this._handleFurnished} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="ac" sm={3}>Air Conditioning</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="acSwitch" name="acSwitch" label="Turn on if you have an air conditioning" onClick = {this._handleAC} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="parking" sm={3}>Parking Available</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="parkingSwitch" name="parkingSwitch" label="Turn on if you have available parking spot" onClick = {this._handleParking} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={3}>Pictures</Label>
                    <Col sm={9}>
                      <Input type="file" name="file" id="formFile" />
                      <FormText color="muted">
                        Upload pictures if available room here
                      </FormText>
                    </Col>
                  </FormGroup>
                  
                 
                
                </ModalBody>



              <ModalFooter>
                <Button type="submit" className="button_char">SUBMIT</Button>{' '}
                <Button className="cancel" onClick={this.toggle}>CANCEL</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>





    );
  }


  _handleClose = e => {
    this.setState({ modal1: false,
      modal2: true
    });
  }
  _handlePostalCode = e => {
    let value = e.target.value;
    this.setState({ postalCode: value });
  }

  _handleStreetNumber = e => {
    let value = e.target.value;
    this.setState({ streetNumber: value });
  }

  _handleStreetName = e => {
    let value = e.target.value;
    this.setState({ streetName: value });
  }

  _handleUnitNumber = e => {
    let value = e.target.value;
    this.setState({ unitNumber: value });
  }

  _handleNeighbourhood = e => {
    let value = e.target.value;
    this.setState({ neighbourhood: value });
  }

  _hanldeType = e => {
    let value = e.target.value;
    this.setState({ buildingType: value });
  }

  _handlePrice = e => {
    let value = e.target.value;
    this.setState({ price: value });
  }

  _handleDescription = e => {
    let value = e.target.value;
    this.setState({ description: value });
  }

  _handleBathrooms = e => {
    let value = e.target.value;
    this.setState({ bathrooms: value});
  }

  _handleLaundry = e => {
    this.setState({ laundry: true });
  }

  _handleFurnished = e => {
    this.setState({ furnished: true });
  }

  _handleAC = e => {
    this.setState({ ac: true });
  }

  _handleParking = e => {
    this.setState({ parking: true });
  }


  _handleSubmit = e => {
    e.preventDefault();

    
    let address = `${this.state.postalCode} ${this.state.streetNumber} ${this.state.streetName} Toronto ON`

    console.log(address);

    
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        const newPlace = {
          postalCode: this.state.postalCode,
          streetNumber: this.state.streetNumber,
          streetName: this.state.streetName,
          unitNumber: this.state.unitNumber,
          neighbourhood: this.state.neighbourhood,
          buildingType: this.state.buildingType,
          price: this.state.price,
          description: this.state.description,
          bathrooms: this.state.bathrooms,
          laundry: this.state.laundry,
          furnished: this.state.furnished,
          ac: this.state.furnished,
          parking: this.state.parking,
          lat: lat,
          lng: lng
        };

        console.log(newPlace);

        axios.post('/places/new', { newPlace })
        .then( res => {
          // const name = res.data[0].first_name;
          // this.setState({ name });
          // console.log(name);
          console.log(res.data)
        })
      },
      error => {
        console.error(error);
      }
    );
  }
    



  
}



// const Register = () => (
//   <div>
//     <Button className="register" id="toggler">
//       REGISTER
//     </Button>
//     <UncontrolledCollapse toggler="#toggler">
//         <CardBody className="reg_or_log">
//           <Button className="register_help">
//             I am looking for a roomy
//           </Button>
//           <Button className="register_help">
//             I have a place to live
//           </Button>
//         </CardBody>
//     </UncontrolledCollapse>
//   </div>
// );

export default Register;