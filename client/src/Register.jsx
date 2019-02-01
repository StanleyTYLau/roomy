import React from 'react';
import axios from 'axios';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'universal-cookie';
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
      modal: false,
      type: '',
      firstName: '',
      lastName:'',
      email: '',
      password: '',
      gender: 'Male',
      cleanliness: 'Low',
      workSched: 'Days',
      goOutFreq: 'Sometimes',
      guestsFreq: 'Sometimes',
      diet: 'None',
      personality: 'Introvert',
      smoker: false,
      pets: false


    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal
    });
    if (e.target.id === "place") {
      this.setState({
      type: "roomy"
    });
    } else if (e.target.id === "roomy") {
      this.setState({
      type: "owner"
    });
    }
  }




  render() {
    return (
      <div>
        <Button className="register" id="toggler">
          REGISTER
        </Button>
        <UncontrolledCollapse toggler="#toggler">
          <CardBody className="reg_or_log">
            <Button id="place" className="register_help" onClick={this.toggle}>
              I am looking for a place to live
            </Button>
            <Button id="roomy" className="register_help" onClick={this.toggle}>
              I am looking for a roomy
            </Button>
          </CardBody>
        </UncontrolledCollapse>
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
                      <Input type="select"  name="genderSelect" id="genderleSelect" onChange={this._handleGender} value="Male" >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
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
                    <Label for="scheduleSelect" sm={3}>Working Schedule</Label>
                    <Col sm={9}>
                      <Input type="select"  name="scheduleSelect" id="scheduleSelect" onChange={this._handleWorkSched} value="Male" >
                        <option>Days</option>
                        <option>Nights</option>
                        <option>Various</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="goOutSelect" sm={3}>How often do you go out?</Label>
                    <Col sm={9}>
                      <Input type="select"  name="goOutSelect" id="goOutSelect" onChange={this._handleGoOutFreq} value="Male" >
                        <option>Sometimes</option>
                        <option>Often</option>
                        <option>Regularly</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="guestsSelect" sm={3}>How often do you have guests to come over?</Label>
                    <Col sm={9}>
                      <Input type="select"  name="guestsSelect" id="guestsSelect" onChange={this._handleGuestsFreq} >
                        <option>Sometimes</option>
                        <option>Often</option>
                        <option>Regularly</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="dietSelect" sm={3}>What is your diet preferences?</Label>
                    <Col sm={9}>
                      <Input type="select"  name="dietSelect" id="dietSelect" onChange={this._handleDiet} >
                        <option>None</option>
                        <option>Vegan</option>
                        <option>Vegeterian</option>
                        <option>Lactose free</option>
                        <option>Gluten free</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="personalitySelect" sm={3}>What is your personality</Label>
                    <Col sm={9}>
                      <Input type="select"  name="personalitySelect" id="personalitySelect" onChange={this._handlePersonality} >
                        <option>Introvert</option>
                        <option>Extravert</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="smokerCheckbox" sm={3}>Smoker</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="smokerSwitch" name="smokerSwitch" label="Turn on if you are" onClick = {this._handleSmoker} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="petsCheckbox" sm={3}>Pets</Label>
                    <Col sm={9}>
                      <CustomInput type="switch" id="petsSwitch" name="petsSwitch" label="Turn on if you have one" onClick = {this._handlePets} />
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
    this.setState({ firstName: value });
  }

  _handleLastName = e => {
    let value = e.target.value;
    this.setState({ lastName: value });
  }

  _handleEmail = e => {
    let value = e.target.value;
    this.setState({ email: value });
  }

  _handlePassword = e => {
    let value = e.target.value;
    this.setState({ password: value });
  }

  _handleGender = e => {
    let value = e.target.value;
    this.setState({ gender: value });
  }

  _hanldeClean = e => {
    let value = e.target.value;
    this.setState({ cleanliness: value });
  }

  _handleWorkSched = e => {
    let value = e.target.value;
    this.setState({ workSched: value });
  }

  _handleGoOutFreq = e => {
    let value = e.target.value;
    this.setState({ goOutFreq: value });
  }

  _handleGuestsFreq = e => {
    let value = e.target.value;
    this.setState({ guestsFreq: value });
  }

  _handleDiet = e => {
    let value = e.target.value;
    this.setState({ diet: value });
  }

  _handlePersonality = e => {
    let value = e.target.value;
    this.setState({ personality: value });
  }

  _handleSmoker = e => {
    this.setState({ smoker: true });
  }

  _handlePets = e => {
    this.setState({ pets: true });
  }

  _handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      cleanliness: this.state.cleanliness,
      smoker: this.state.smoker,
      pets: this.state.pets,
      type: this.state.type,
      workSched: this.state.workSched,
      goOutFreq: this.state.goOutFreq,
      guestsFreq: this.state.guestsFreq,
      diet: this.state.diet,
      personality: this.state.personality

    };

    console.log(newUser);

    axios.post('/users/register', { newUser })
      .then( res => {
        if (res.data){
          const cookies = new Cookies();
          cookies.set('user', res.data)
          this.setState({loggedIn: true});
          //set a cookie
        console.log(res.data)
      }
  })


 


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