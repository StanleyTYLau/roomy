import React from 'react';
import axios from 'axios';
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

class Place_id extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  


  render() {
    return (
      <div>
        <Button className="register" id="toggler" onClick={this.toggle}>
          Some Place!
        </Button>
  
        <div className="middle_all">
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="pop_windows">
            <ModalHeader toggle={this.toggle}>Please, fill out the form</ModalHeader>
              <Form onSubmit = {this._handleSubmit}>
                <ModalBody>

                  <FormGroup row>
                    <Label for="FirstName" sm={3}>First Name</Label>
                    <Col sm={9}>
                      <Input type="text" name="FirstName" id="formFirstName" placeholder="Your First Name" onChange={this._handleFirstName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="LastName" sm={3}>Last Name</Label>
                    <Col sm={9}>
                      <Input type="text" name="LastName" id="formLastName" placeholder="Your Last Name" onChange={this._handleLastName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="Email" sm={3}>Email</Label>
                    <Col sm={9}>
                      <Input type="email" name="email" id="formEmail" placeholder="Your Email" onChange={this._handleEmail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="Password" sm={3}>Password</Label>
                    <Col sm={9}>
                      <Input type="password" name="password" id="formPassword" placeholder="Create a Password" onChange={this._handlePassword} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={3}>Picture</Label>
                    <Col sm={9}>
                      <Input type="file" name="file" id="formFile" />
                      <FormText color="muted">
                        Please, upload your profile picture
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="genderSelect" sm={3}>Gender</Label>
                    <Col sm={9}>
                      <Input type="select" name="genderSelect" id="genderleSelect" onChange={this._handleGender} >
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="genderSelect" sm={3}>Cleanliness</Label>
                    <Col sm={9}>
                      <Input type="select" name="cleanlinessSelect" id="cleanlinessSelect" onChange={this._hanldeClean} >
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="smokerCheckbox" sm={3}>Smoker</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="smokerSwitch" name="smokerSwitch" label="Turn on if you are" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="petsCheckbox" sm={3}>Pets</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="petsSwitch" name="petsSwitch" label="Turn on if you have one" />
                    </Col>
                  </FormGroup>

                </ModalBody>
              <ModalFooter>
                <Button type="submit" className="button_char" onClick={this.toggle}>SUBMIT</Button>{' '}
                <Button className="cancel" onClick={this.toggle}>CANCEL</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
  _handleFirstName = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, first_name: value });
  }

  _handleLastName = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, last_name: value });
  }

  _handleEmail = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, email: value });
  }

  _handlePassword = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, password: value });
  }

  _handleGender = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, gender: value });
  }

  _hanldeClean = e => {
    let value = e.target.value;
    this.setState({...this.state.newUser, cleanliness: value });
  }

  // _handleSmoker = e => {
    
  // }

  // _handlePets = e => {

  // }

  _handleSubmit = e => {
    e.preventDefault();
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      cleanliness: this.state.cleanliness
      
    };

    // axios.post('/users/register', { user })
    //   .then( res => {
    //     // const name = res.data[0].first_name;
    //     // this.setState({ name });
    //     // console.log(name);
    //     console.log(res.data)
    //   })
  }
}

export default Place_id;