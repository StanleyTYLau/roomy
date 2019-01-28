import React from 'react';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';


const Register = () => (
  <div>
    <Button className="register" id="toggler">
      REGISTER
    </Button>
    <UncontrolledCollapse toggler="#toggler">
        <CardBody className="reg_or_log">
          <Button className="register_help">
            I am looking for a roomy
          </Button>
          <Button className="register_help">
            I have a place to live
          </Button>
        </CardBody>
    </UncontrolledCollapse>
  </div>
);

export default Register;