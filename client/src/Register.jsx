import React from 'react';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

function Display(props) {
  if (props.type === 1) {
    return (
      <div>
        <p>First Name</p>
        <p>Last Name</p>
      </div>
      );
  } else if (props.type === 2) {
    return (
      <div>
        <p>Email</p>
        <p>Password</p>
      </div>
      );
  }
}

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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Please, fill out the form</ModalHeader>
          <ModalBody>
          <Display type={this.state.type}></Display>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
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