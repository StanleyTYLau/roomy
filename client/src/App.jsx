import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
// import { Container, Row, Col } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, 
  Route, 
  Link,
  Redirect 
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
            <Input type="email" name="email" id="userEmail" placeholder="Enter your email" onChange = {this.props._handleEmailChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="userPassword" placeholder="Enter your password" onChange = {this.props._handlePassChange}/>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <Button className="button_char">
                <Link to="/main">LOGIN</Link>
              </Button>
            </Col>
            <Col md={6}>
              <a href="" className="register">or REGISTER</a>
            </Col>
          </Row>
        </Form>
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

const auth = {
  isAuthenticated: false,

  authenticate(email, password) {
    const login = {
      email: email,
      password: password
    };  

    axios.post('/users/login', { login })
      .then( res => {
        const name = res.data[0].first_name;
        if (name){
          console.log("user authenticated!");
          this.isAuthenticated = true;
        }
      })
  },

  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {

  state = {
    members: [],
    email: '',
    password: '',
    name: ''
  }

  componentDidMount() {
    axios.get('/users')
      .then(res =>  {
        const members = res.data;
        this.setState({ members });
        console.log(members);
      })
  }
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
          <Route 
            path='/' 
            render={(props) => <Login 
              {...props} 
              _handleSubmit={this._handleSubmit}
              _handleEmailChange={this._handleEmailChange}
              _handlePassChange={this._handlePassChange}
            />} 
          />
          {/* <Route  
            path='/main' 
            render={(props) => <Main 
              {...props} 
              x={"this x passed as prop"}
            />} 
          /> */}
          <PrivateRoute path="/main" component={Main} />
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
    
    auth.authenticate(this.state.email, this.state.password);
   
  }

}

        //<div className="Users">
         //<h1>Users</h1>
         //{this.state.members.map(member =>
          // <div key={member.id}>{member.first_name} {member.last_name} - {member.email}</div>
         //)}
       //</div>

export default App;