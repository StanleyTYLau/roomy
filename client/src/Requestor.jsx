import React from 'react';
import { Button, Table, Badge } from 'reactstrap';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';

class Requestor extends React.Component {
  constructor() {
    super();
    this.state = {
      accepted: '',
      refresh: false,
    };

  }

  componentDidMount() {
    this.setState({
      accepted: this.props.accepted
    })
  }

  render() {
   
    const ownerAnswer = (ans) => {
      if (ans === true){
        return "You Accepted!"
      }
      else if (ans === false){
        return "You Declined!"
      }
      else {
        return ""
      }
    }

    return(
      <div className="requests_all">
              <img src={this.props.requestor.picture_url} alt="Logo"></img>
              <div>
                <p className="weight700">{this.props.requestor.first_name}, Matching: {this.props.matchPercent * 100}%</p>
                {ownerAnswer(this.props.accepted)}
              
                <div>
                  <Button type="submit" className="button_char small_text color_b" onClick={() => this.props.handleAccept(this.props.index, this.props.requestorId, this.props.requestor)}>ACCEPT</Button>
                  <Button className="cancel small_text" onClick={() => this.props.handleDecline(this.props.index, this.props.requestorId)}>DECLINE</Button>
                  <Button className="button_char small_text" id={String(this.props.requestor.last_name + this.props.requestor.first_name)}>DETAILS</Button>
                   <UncontrolledCollapse toggler={String(this.props.requestor.last_name + this.props.requestor.first_name)}>
                    <Card>
                      <CardBody className="request_info">
                        <Table borderless>
                          <tbody>
                            <tr>
                              <th scope="row">Gender:</th>
                              <td>{this.props.requestor.gender}</td>
                            </tr>
                            <tr>
                              <th scope="row">Smoker:</th>
                              <td>{this.props.requestor.smoker ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Pets:</th>
                              <td>{this.props.requestor.pets ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                              <th scope="row">Cleanliness:</th>
                              <td>{this.props.requestor.cleanliness}</td>
                            </tr>
                            <tr>
                              <th scope="row">Work Schedule:</th>
                              <td>{this.props.requestor.work_sched}</td>
                            </tr>
                            <tr>
                              <th scope="row">Go out frequently:</th>
                              <td>{this.props.requestor.go_out_freq}</td>
                            </tr>
                            <tr>
                              <th scope="row">Guests frequently:</th>
                              <td>{this.props.requestor.guest_freq}</td>
                            </tr>
                            <tr>
                              <th scope="row">Hobbies:</th>
                              <td>{this.props.requestor.hobbies}</td>
                            </tr>
                            <tr>
                              <th scope="row">Diet:</th>
                              <td>{this.props.requestor.diet}</td>
                            </tr>
                            <tr>
                              <th scope="row">Personality:</th>
                              <td>{this.props.requestor.personality}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </div>
            </div>


 
    );
  }

 
}

export default Requestor;