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
        {this.props.first_name}
        {this.props.last_name}
        {this.props.accepted}
        {this.props.matchPercent * 100}
      </div>
    );
  }
}

export default Requestor;