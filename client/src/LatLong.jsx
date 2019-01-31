import React, {Component} from 'react';
import { Button } from 'reactstrap';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyABwXxJyM59e_GmCcHsfUhLhZJKoPjvCdI");

const LatitudeLongitude = ({ text }) => <Button color="success">{text}</Button>;

Geocode.fromAddress("45 Dunfield Avenue, Toronto, ON, M4S 2H4").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);


class LatitudeLongitudes extends Component {

  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      latlng: [
        {
          id: 1,
          lat: 23.706198,
          lng: -79.394332,
        },
        {
          id: 2,
          lat: 43.741207,
          lng: -79.281756
        },
        {
          id: 3,
          lat: 43.640995,
          lng: -79.394570
        }
      ],

      places: [
        {
          id: 1,
          postal_code: 'M4S 2H4',
          street_number: 45,
          street_name: 'Dunfield Avenue',
          province: 'ON',
          city: 'Toronto',
          price: 1200.00
        },
        {
          id: 2,
          postal_code: 'M1P 2B7',
          street_number: 1159,
          street_name: 'Birchmount Rd',
          province: 'ON',
          city: 'Toronto',
          price: 595.00
        },
        {
          id: 3,
          postal_code: 'M5V 3Z1',
          street_number: 25,
          street_name: 'Telegram Mews',
          province: 'ON',
          city: 'Toronto',
          price: 3000.00
        }
      ]
     };
  }

  // _addressCreator() {
  //   const allPlaces = this.state.places;
  //   const placesList = allPlaces.map((place) => {
  //     const address = {place.street_number} + " " + {place.street_name} + ", " + {place.city} + ", " + {place.province} + ", " + {place.postal_code};
  //     Geocode.fromAddress(address).then(
  //       response => {
  //         const { lat, lng } = response.results[0].geometry.location;
  //         this.setState({ latlng: e.target.value });
  //         console.log(lat, lng);
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   });
  // }

  render() {

    const placesAll = this.state.latlng;
    const placesList = placesAll.map((place) => {
      console.log("lat: ", place.lat, place.lng);
      return <LatitudeLongitude
            key={place.id}
            lat={place.lat}
            lng={place.lng}
            text={place.id}
            />
    });

    return (
        <React.Fragment>
          {placesList}
          </React.Fragment>

    );
  }
}
export default LatitudeLongitudes;
