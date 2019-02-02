import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Collapse, Button, CardBody, Card, CustomInput } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import key from "./google.jsx";
import Place_id from './Place_id.jsx';
import axios from 'axios';

// Geocode.setApiKey(process.env.API_KEY);


const LatitudeLongitude = ({ hover, hover_id, text, onMouseEnter, onMouseLeave }) =>
<Button data-id={text}
onMouseEnter={onMouseEnter}
onMouseLeave={onMouseLeave}
color="success"
className={Number(hover_id) === Number(text) && hover ? "hover_but" : "" }>{text}</Button>;


// const getLatLongFromAddress = (address) => {
//   return Geocode.fromAddress(address).then(
//   response => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//     return { lat, lng }
//   },
//   error => {
//     console.error(error);
//     return error;
//   }
// );
// }

// {
//       isUpdatingPlaces ? (<div>Is loading...</div>) : ()
//     }
// const isUpdatingPlaces = this.state.isUpdatingPlaces;
      // isUpdatingPlaces: true,

class SimpleMap extends Component {

  // componentDidMount() {
  //   const newPlaces = this.state.places.map(place => {
  //     getLatLongFromAddress(place.addre).then(latlong => {
  //       const newPlace = {
  //       ...place,
  //       lat: latlong.lat,
  //       lng: latlong.lng
  //     }

  //     return newPlace


  //     })


  //   })

  //   this.setState({places: newPlaces, isUpdatingPlaces: false})
  // }

constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      hover: false,
      hover_id: -1,

      places: [],

      neighbourhood: '',
      buildingType: '',
      monthlyPriceFrom: '',
      monthlyPriceTo: '',
      parking: '',
      laundry: '',
      ac: '',
      furnished: ''
     };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  static defaultProps = {
    center: {
      lat: 43.761539,
      lng: -79.411079
    },
    zoom: 11
  };

  toggleHover = (e) => {
    this.setState({ hover: true, hover_id: e.target.dataset.id });
  };

  toggleLeave = (e) => {
    this.setState({ hover: false });
  };

  componentWillMount(){

    //Get the data on every place and insert to state.place
    axios.get(`/places`)
      .then( res => {
        this.setState({places: res.data});
      })
  }

  render() {

    const placesList = this.state.places;

    return (

      <div className="middle_all">
        <div className="google_map">
          <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          >
            {placesList.map(latlong => {
              return (
                <LatitudeLongitude
                hover={this.state.hover}
                hover_id={this.state.hover_id}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleLeave}
                key={latlong.id}
                lat={latlong.lat}
                lng={latlong.lng}
                text={latlong.id}
                />
                )
            })}
          </GoogleMapReact>
        </div>
        <div className="right">
          <div className="topsearch">
            <div className="wrapper">
              <Button className="button_char" onClick={this.toggle}>SEARCH</Button>
              <p className="logout">Your Email</p>
              <a className="logout" href="">Logout</a>
              <img src="/images/logo_white.png" alt="Logo"></img>
            </div>
            <Collapse isOpen={this.state.collapse}>
              <Card style={{ marginTop: '1rem' }}>
                <CardBody>
                  <Form onSubmit={this._handleSubmit}>
                  <p className="price">Please, choose your search criteria:</p>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Neighbourhood</Label>
                      <Col sm={9}>
                        <Input type="select" name="select" id="exampleSelect" onChange = {this._handleArea}>
                          <option>All</option>
                          <option>Downtown</option>
                          <option>East End</option>
                          <option>East York</option>
                          <option>Etobicoke</option>
                          <option>Midtown</option>
                          <option>North York</option>
                          <option>Scarborough</option>
                          <option>Uptown</option>
                          <option>West End</option>
                          <option>York-Crosstown</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleSelect" sm={3}>Type of building</Label>
                      <Col sm={9}>
                        <Input type="select" name="select" id="exampleSelect"  onChange={this._handleType} >
                          <option>Al types</option>
                          <option>Condo</option>
                          <option>Apartment</option>
                          <option>House</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="From">Monthly Price (per room) From:</Label>
                          <Input type="text" name="from" id="from" placeholder="" onChange = {this._handlePriceFrom} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="To">To:</Label>
                          <Input type="text" name="to" id="to" placeholder="" onChange = {this._handlePriceTo} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row>
                      <Label for="parkingCheckbox" sm={3}>Parking</Label>
                      <Col sm={9}>
                        <CustomInput type="switch" id="parkingSwitch" name="parkingSwitch" label="Turn on if you need a parking place" onClick = {this._handleParking} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="laundryCheckbox" sm={3}>Laundry</Label>
                      <Col sm={9}>
                        <CustomInput type="switch" id="laundrySwitch" name="laundrySwitch" label="Turn on if you need a washer/dryer" onClick = {this._handleLaundry} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="AC_Checkbox" sm={3}>Air conditioning</Label>
                      <Col sm={9}>
                        <CustomInput type="switch" id="AC_Switch" name="AC_Switch" label="Turn on if you need AC" onClick = {this._handleAC} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="furnishedCheckbox" sm={3}>Furnished</Label>
                      <Col sm={9}>
                        <CustomInput type="switch" id="furnishedSwitch" name="furnishedSwitch" label="Turn on if you need a furnished place" onClick = {this._handleFurnished} />
                      </Col>
                    </FormGroup>
                    <Button type="submit" className="button_char" >GO FOR IT</Button>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div className="scrollable">
          {placesList.map(place => {
              return (
                <div
                key={"place"+place.id} className={Number(this.state.hover_id) === place.id && this.state.hover ? "hover_place" : "" }>
                  <div className="places" data-id={place.id}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleLeave}>
                    <div className="map_places">
                    <div className="place_number">{place.id}</div>
                      <div>
                        <img src="/images/room_exm.png" alt="room" className="img_place"></img>
                      </div>
                      <div>
                        <div className="price">${place.price}/m</div>
                        <div>{place.street_number} {place.street_name}, {place.city}, {place.province}, {place.postal_code}</div>
                        <Place_id place_id={place.id}></Place_id>
                      </div>
                    </div>
                  </div>
                </div>
                )
            })}
          </div>
        </div>
      </div>
    );
  }

  _handleArea = e => {
    let value = e.target.value;
    if (value === 'All'){
      this.setState({ neighbourhood: ''})
    } else {
    this.setState ({ neighbourhood: value })
    }
  }

  _handleType = e => {
    let value = e.target.value;
    if (value === "All types") {
      this.setState({ buildingType: '' })
    } else {
      this.setState ({ buildingType: value });  
    }
  }

  _handlePriceFrom = e => {
    let value = e.target.value;
    this.setState ({ monthlyPriceFrom: value });
  }

  _handlePriceTo = e => {
    let value = e.target.value;
    this.setState ({ monthlyPriceTo: value });
  }

  _handleParking = e => {
    this.setState ({ parking: true })
  }

  _handleLaundry = e => {
    this.setState ({ laundry: true });
  }

  _handleAC = e => {
    this.setState ({ ac: true });
  }

  _handleFurnished = e => {
    this.setState ({ furnished: true });
  }

  _handleSubmit = e => {
    e.preventDefault();

    const query = {
      neighbourhood: this.state.neighbourhood,
      buildingType: this.state.buildingType,
      monthlyPriceFrom: this.state.monthlyPriceFrom,
      monthlyPriceTo: this.state.monthlyPriceTo,
      parking: this.state.parking,
      laundry: this.state.laundry,
      ac: this.state.ac,
      furnished: this.state.furnished
    }


    axios.post('/places/search', { query })
      .then( res => {

        if (res.data){
            this.setState({places: res.data});
        // console.log(res.data)
      }
      this.setState({ collapse: !this.state.collapse });
  })

  }

}

export default SimpleMap;