import React, { Component } from 'react';
import './App.scss';
// import { Container, Row, Col } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, 
  Route, 
  Link 
} from "react-router-dom";

const Login = () => (
  <div className="middle_all">
        <div className="middle_logo">
          <img src="/images/logo_white.png" alt="Logo" className="logo"></img>
        </div>
        <div className="slogan">We help people to find roommates and places to live.</div>

        <Form className="middle_form">
        <FormGroup>
          <Label for="Login" className="bold_font">Please, log in first:</Label>
        </FormGroup>
        <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" name="email" id="userEmail" placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="userPassword" placeholder="Enter your password" />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <Button className="button_char">
                <Link to='/main'>LOGIN</Link>
              </Button>
            </Col>
            <Col md={6}>
              <a href="" className="register">or REGISTER</a>
            </Col>
          </Row>
        </Form>
      </div>
)

class Main extends Component {
  render(){
    return (
      <div>
        <h2>You are at the main page!</h2>
        {this.props.x}
      </div>
    )
  }
}

class App extends Component {

  state = {
    members: []
  };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(members => this.setState({ members: members }));
  };
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });

  //   const body = await response.text();

  //   this.setState({ responseToPost: body });
  // };
  

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/main' render={(props) => <Main {...props} x={1}/>} />
        </div>
      </Router>     
    );
  }
}

        //<div className="Users">
         //<h1>Users</h1>
         //{this.state.members.map(member =>
          // <div key={member.id}>{member.first_name} {member.last_name} - {member.email}</div>
         //)}
       //</div>

export default App;