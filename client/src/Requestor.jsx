import React from 'react';
import axios from 'axios';

class Requestor extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };

  }

  render() {
    return(
      <div>
        {this.props.requestorId}
        {this.props.accepted}
      </div>
    );
  }
}

export default Requestor;