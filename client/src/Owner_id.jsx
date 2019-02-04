import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Requestor from './Requestor.jsx';
import { Button, Table, Badge } from 'reactstrap';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';


class Owner_id extends React.Component {
  constructor() {
    super();
    this.state = {
      requestorList: [],
      userInfo: {},
      placeData: {}

    };
  }

  async componentWillMount(){
    const cookies = new Cookies();
    let userInfo = await cookies.get('user');
    await this.setState({userInfo: userInfo});

    //Get the data on every place and insert to state.place
    axios.get(`/owners/${userInfo.id}`)
      .then( res => {
        let data = res.data
        console.log(res.data);
        this.setState({
          placeData: data.placeInfo,
          requestorList: data.requestorList
        })

      })
  }


  render() {
    const placesList = this.state.placeData;

    return (

    <div>
      <div className="topsearch">
        <div className="wrapper">
          <img src="/images/logo_white.png" alt="Logo"></img>
          <p className="logout">You're signed in with {this.state.userInfo.email}</p>
          <a className="logout" href="/" onClick={this._handleLogout}>Logout</a>
        </div>
      </div>
      <div className="middle_all owner_all">
        <div className="owner_img">
          <img src="/images/room1.png" alt="Picture #1"></img>
          <img src="/images/room2.png" alt="Picture #2"></img>
          <img src="/images/room3.png" alt="Picture #3"></img>
        </div>
        <div>
          <Table borderless>
            <tbody>
              <tr>
                <th scope="row">Price:</th>
                <td>${this.state.placeData.price}</td>
              </tr>
              <tr>
                <th scope="row">Description:</th>
                <td>{this.state.placeData.description}</td>
              </tr>
              <tr>
                <th scope="row">Neighbourhood:</th>
                <td>{this.state.placeData.neighbourhood}</td>
              </tr>
              <tr>
                <th scope="row">Address:</th>
                <td>{this.state.placeData.street_number} {this.state.placeData.street_name}, {this.state.placeData.city}, {this.state.placeData.postal_code}</td>
              </tr>
              <tr>
                <th scope="row">Building Type:</th>
                <td>{this.state.placeData.type_of_building}</td>
              </tr>
              <tr>
                <th scope="row">Parking:</th>
                <td>{this.state.placeData.parking ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th scope="row"># of Baths:</th>
                <td>{this.state.placeData.number_of_bathrooms}</td>
              </tr>
              <tr>
                <th scope="row">Air condition:</th>
                <td>{this.state.placeData.air_condition ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th scope="row">Furnished:</th>
                <td>{this.state.placeData.furnished ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th scope="row">Laundry:</th>
                <td>{this.state.placeData.laundry ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="requests">
          <div className="price">Requests <Badge className="color_b">{this.state.requestorList.length}</Badge> :</div>
          <div>
            {this.state.requestorList.map((requestor, index) => {
              return(
                <Requestor
                  index={index}
                  requestorId={requestor.userid}
                  requestor={requestor}
                  accepted={requestor.accepted}
                  matchPercent={requestor.matchPercent}
                  handleAccept={this._handleAccept}
                  handleDecline={this._handleDecline}
                />
              );
            })}

          </div>
          </div>
        </div>

        {/* REQUESTORS:
        {this.state.requestorList.map((requestor, index) => {
          return(
            <Requestor
              index={index}
              requestorId={requestor.userid}
              first_name={requestor.first_name}
              last_name={requestor.last_name}
              accepted={requestor.accepted}
              matchPercent={requestor.matchPercent}
              handleAccept={this._handleAccept}
              handleDecline={this._handleDecline}
            />
          );
        })} */}








    </div>
      );

  }

  _handleAccept = (index, reqId, reqData) => {
    let reqList = this.state.requestorList;
    reqList[index].accepted = 'true';


    console.log("trying to goto:", this.state.userInfo.id);
    console.log("index:", index);

    axios.put(`/owners/${this.state.userInfo.id}`, {ownerAnswer: true, placeData: this.state.placeData, requestorId: reqId, requestor: reqData, ownerData: this.state.userInfo})
      .then( (res) => {
        console.log(`${res.data} Accepted ${reqId}`);
        this.setState({requestorList: reqList});
        this.forceUpdate();
      });
  }
  _handleDecline = (index, reqId) => {
    let reqList = this.state.requestorList;
    reqList[index].accepted = 'false';


    console.log("trying to goto:", this.state.userInfo.id);
    console.log("index:", index);

    axios.put(`/owners/${this.state.userInfo.id}`, {ownerAnswer: false, placeData: this.state.placeData, requestorId: reqId})
      .then( (res) => {
        console.log(`${res.data} Declined ${reqId}`);
        this.setState({requestorList: reqList});
        this.forceUpdate();
      });
  }

  _handleLogout = e => {
    const cookies = new Cookies();
    cookies.remove('user');

  }

}


// {placesList.map(place => {
//         return (
//           <div className="places pointer" data-id={place.id}>
//             <div className="map_places">
//                 <div>
//                   <img src="/images/room_exm.png" alt="room" className="img_place"></img>
//                 </div>
//                 <div>
//                   <div className="price">${place.price}/m</div>
//                   <div>{place.street_number} {place.street_name}, {place.city}, {place.province}, {place.postal_code}</div>
//                 </div>
//             </div>
//           </div>
//               // <p>{place.neighbourhood}</p>
//               )
//             })}


export default Owner_id;