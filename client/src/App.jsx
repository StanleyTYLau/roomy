import React, { Component } from 'react';
import './App.scss';
import Register from './Register.jsx';
import MapDisplay from './MapDisplay.jsx';
import Owner_id from './Owner_id.jsx';
import Geocode from "react-geocode";
import Register_place from './Register_place.jsx';
import Place_id from './Place_id.jsx';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { Container, Row, Col } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class Login extends Component{
  constructor() {
    super();
    this.state = {

    };

  }

  render(){
    return(
      <div className="middle_all">
        <div className="middle_logo">
          <img src="/images/logo_white.png" alt="Logo" className="logo"></img>
        </div>
        <div className="slogan">We help people to find roommates and places to live.</div>

        <Form className="middle_form" onSubmit = {this.props._handleSubmit}>
        <FormGroup>
          <Label for="Login" className="bold_font">Please, log in first:</Label>
        </FormGroup>
        <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" name="email" id="userEmail" placeholder="Enter your email" onChange = {this.props._handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="userPassword" placeholder="Enter your password" onChange = {this.props._handlePassChange} />
          </FormGroup>
            <Button type="submit" className="button_char">LOGIN</Button>
        </Form>
        <div className="registerBut">
          <Register></Register>
        </div>
      </div>
    )
  }
}

class App extends Component {


  state = {
    members: [],
    email: '',
    password: '',
    name: '',
    loggedIn: false,
    first_name: ''

  }



  render() {
    return (
      <Router>
        <div>
          <Route
            exact path='/'
            render={(props) => (
              <div>
              <Login
                {...props}
                _handleSubmit={this._handleSubmit}
                _handleEmailChange={this._handleEmailChange}
                _handlePassChange={this._handlePassChange}
              />
              {this.state.loggedIn ? (
                <Redirect to="/main"/>
              ) : (
                <span></span>
              )}
              </div>
            )}
          />

          <Route
            path='/main'
            render={(props) => <MapDisplay
              {...props}
              x={"this x passed as prop"}
            />}
          />
          <Route
            exact path='/places/new'
            component = {Register_place}
          />
          <Route path='/places/:id' component={Place_id} />
          <Route path='/owners/:id' component={Owner_id} />
        </div>
      </Router>

    );
  }

  _handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  _handlePassChange = event => {
    this.setState({ password: event.target.value });
  }

  _handleSubmit = event => {
    event.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/users/login', { login })
      .then( res => {
        if (res.data){
          const cookies = new Cookies();
          cookies.set('user', res.data)
          console.log("COOKIE:", cookies.get('user'));
          this.setState({loggedIn: true});

        }

      })
  }

}


export default App;