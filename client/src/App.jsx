import React, { Component } from 'react';
import './App.scss';
import Register from './Register.jsx';
import axios from 'axios';
// import { Container, Row, Col } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, 
  Route, 
  Link 
} from "react-router-dom";

class Login extends Component{
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
    members: [],
    email: '',
    password: '',
    name: '',
    newUser: {
      first_name: '',
      last_name:'',
      email: '',
      password: '',
      gender: '',
      cleanliness: '',
      smoker: '',
      pets: ''
    }
  }

  // componentDidMount() {
  //   axios.get('/users')
  //     .then(res =>  {
  //       const members = res.data;
  //       this.setState({ members });
  //       console.log(members);
  //     })
  // }


  render() {
    return (
      <Router>
        <div>
        <Route 
            exact path='/' 
            render={(props) => <Login 
              {...props} 
              _handleSubmit={this._handleSubmit}
              _handleEmailChange={this._handleEmailChange}
              _handlePassChange={this._handlePassChange}
            />} />
          <Route 
            path='/main' 
            render={(props) => <Main 
              {...props} 
              x={"this x passed as prop"}
            />} />
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
        // const name = res.data[0].first_name;
        // this.setState({ name });
        // console.log(name);
        console.log(res.data)
      })
  }

}

  
export default App;