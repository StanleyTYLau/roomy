import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Geocode from "react-geocode";
import key from "./google.jsx";

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

      places: [
        {
          id: 1,
          postal_code: 'M4S 2H4',
          street_number: 45,
          street_name: 'Dunfield Avenue',
          province: 'ON',
          city: 'Toronto',
          price: 1200.00,
          lat: 43.706198,
          lng: -79.394332
        },
        {
          id: 2,
          postal_code: 'M1P 2B7',
          street_number: 1159,
          street_name: 'Birchmount Rd',
          province: 'ON',
          city: 'Toronto',
          price: 595.00,
          lat: 43.741207,
          lng: -79.281756
        },
        {
          id: 3,
          postal_code: 'M5V 3Z1',
          street_number: 25,
          street_name: 'Telegram Mews',
          province: 'ON',
          city: 'Toronto',
          price: 3000.00,
          lat: 43.640995,
          lng: -79.394570
        },
        {
          id: 4,
          postal_code: 'M4S 2H4',
          street_number: 45,
          street_name: 'Dunfield Avenue',
          province: 'ON',
          city: 'Toronto',
          price: 1200.00,
          lat: 43.706198,
          lng: -79.394332
        },
        {
          id: 5,
          postal_code: 'M1P 2B7',
          street_number: 1159,
          street_name: 'Birchmount Rd',
          province: 'ON',
          city: 'Toronto',
          price: 595.00,
          lat: 43.741207,
          lng: -79.281756
        },
        {
          id: 6,
          postal_code: 'M5V 3Z1',
          street_number: 25,
          street_name: 'Telegram Mews',
          province: 'ON',
          city: 'Toronto',
          price: 3000.00,
          lat: 43.640995,
          lng: -79.394570
        }
      ]
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
              <Button className="button_char" onClick={this.toggle} style={{ marginBottom: '1rem' }}>SEARCH</Button>
              <img src="/images/logo_white.png" alt="Logo"></img>
            </div>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <p>Neighborhood</p>
                  {/*<p>Type of building</p>
                  <p>Number of rooms</p>
                  <p>Number of bathrooms</p>
                  <p>Monthly price (per room)</p>
                  <p>Parking</p>
                  <p>Short (4 months) or long term<p>
                  <p>Air conditioning</p>
                  <p>Utilities</p>
                  <p>Furnished</p>
                  <p>Pets allowed</p>
                  <p>Facilities (gym, locker, pool, ...)</p>
                  <p>Services (security, cleaning, ...)</p>*/}
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
                      <div>
                        <img src="/images/room_exm.png" alt="room" className="img_place"></img>
                      </div>
                      <div>
                        <div className="price">${place.price}/m</div>
                        <div>{place.street_number} {place.street_name}, {place.city}, {place.province}, {place.postal_code}</div>
                        <Button type="" className="button_char">DETAILS</Button>
                      </div>
                      <div className="place_number">{place.id}</div>
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
}

export default SimpleMap;