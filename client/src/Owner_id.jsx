import React from 'react';
import axios from 'axios';
import { Button, Table, Badge } from 'reactstrap';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';


class Owner_id extends React.Component {
  constructor() {
    super();
    this.state = {
      collapse: ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k"],
      placeData: {}
    };
  }

  componentWillMount(){
    //Get the data on every place and insert to state.place
    axios.get(`/owners/58`)
      .then( res => {
        let data = res.data
        console.log(res.data);
        this.setState({ placeData: data})

      })
  }


  render() {
    const placesList = this.state.placeData;

    return (

    <div>
      <div className="topsearch">
        <div className="wrapper">
          <img src="/images/logo_white.png" alt="Logo"></img>
          <p className="logout">You're signed in with Your Email</p>
          <a className="logout" href="">Logout</a>
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
          <div className="price">Requests <Badge className="color_b">2</Badge> :</div>
          <div>
            <div className="requests_all">
              <img src="/images/request1.png" alt="Logo"></img>
              <div>
                <p className="weight700">Angie, Matching: 100%</p>
                <div>
                  <Button type="submit" className="button_char small_text color_b" onClick={this._handleRequest}>EXCEPT</Button>
                  <Button className="cancel small_text">DECLINE</Button>
                  <Button className="button_char small_text" id={this.state.collapse[0]+String(this.state.placeData.id)}>DETAILS</Button>
                   <UncontrolledCollapse toggler={this.state.collapse[0]+String(this.state.placeData.id)}>
                    <Card>
                      <CardBody className="request_info">
                        <Table borderless>
                          <tbody>
                            <tr>
                              <th scope="row">Gender:</th>
                              <td>{this.state.placeData.id}</td>
                            </tr>
                            <tr>
                              <th scope="row">Smoker:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Pets:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Cleanliness:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Work Schedule:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Go out frequently:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Guests frequently:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Hobbies:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Diet:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Personality:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </div>
            </div>

            <div className="requests_all">
              <img src="/images/request1.png" alt="Logo"></img>
              <div>
                <p className="weight700">Angie, Matching: 100%</p>
                <div>
                  <Button type="submit" className="button_char small_text color_b" onClick={this._handleRequest}>EXCEPT</Button>
                  <Button className="cancel small_text">DECLINE</Button>
                  <Button className="button_char small_text" id={this.state.collapse[1]+String(this.state.placeData.id)}>DETAILS</Button>
                   <UncontrolledCollapse toggler={this.state.collapse[1]+String(this.state.placeData.id)}>
                    <Card>
                      <CardBody className="request_info">
                        <Table borderless>
                          <tbody>
                            <tr>
                              <th scope="row">Gender:</th>
                              <td>{this.state.placeData.id}</td>
                            </tr>
                            <tr>
                              <th scope="row">Smoker:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Pets:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Cleanliness:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Work Schedule:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Go out frequently:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Guests frequently:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Hobbies:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Diet:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                            <tr>
                              <th scope="row">Personality:</th>
                              <td>{this.state.placeData.price}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              </div>
            </div>

          </div>
          </div>
        </div>








    </div>
      );

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