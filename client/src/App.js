import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  state = {
    members: []
  };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(members => this.setState({ members: members }));
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
      <div className="Users">
         <h1>Users</h1>
         {this.state.members.map(member =>
           <div key={member.id}>{member.first_name} {member.last_name} - {member.email}</div>
         )}
       </div>
    );
  }
}

export default App;
