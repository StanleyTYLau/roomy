import React from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

class Requestor extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };

  }

  render() {
    return(
      <div>
        <Table borderless>
          <tbody>
            <tr>
              {this.props.requestorId}{this.props.first_name} {this.props.last_name} Matching:{this.props.matchPercent * 100}%
            </tr>
          </tbody>  
        </Table>
        <Button type="submit" className="button_char" onClick={() => this.props.handleAccept(this.props.index, this.props.requestorId)}>Accept</Button>
        <Button className="cancel" >Decline</Button>
        
        {/* Need this to change how the button looks if already clicked */}
        {this.props.accepted}
      </div>
    );
  }
}

export default Requestor;