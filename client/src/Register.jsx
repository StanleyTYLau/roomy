import React from 'react';
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
      modal: false,
      type: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal
    });
    if (e.target.id === "place") {
      this.setState({
      type: 1
    });
    } else if (e.target.id === "roomy") {
      this.setState({
      type: 2
    });
    }
    console.log(this.state.type);
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
              <Form>
                <ModalBody>

                  <FormGroup row>
                    <Label for="FirstName" sm={3}>First Name</Label>
                    <Col sm={9}>
                      <Input type="text" name="FirstName" id="formFirstName" placeholder="Your First Name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="LastName" sm={3}>Last Name</Label>
                    <Col sm={9}>
                      <Input type="text" name="LastName" id="formLastName" placeholder="Your Last Name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="Email" sm={3}>Email</Label>
                    <Col sm={9}>
                      <Input type="email" name="email" id="formEmail" placeholder="Your Email" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="Password" sm={3}>Password</Label>
                    <Col sm={9}>
                      <Input type="password" name="password" id="formPassword" placeholder="Create a Password" />
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
                      <Input type="select" name="genderSelect" id="genderleSelect" >
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="genderSelect" sm={3}>Cleanliness</Label>
                    <Col sm={9}>
                      <Input type="select" name="cleanlinessSelect" id="cleanlinessSelect" >
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