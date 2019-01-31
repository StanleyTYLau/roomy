import React, {Component} from 'react';
import Place from './Place.jsx';

class PlaceList extends Component {
  render() {
    const placesAll = this.props.places;
    const placesList = placesAll.map((place) => {
      return <Place key={place.id} plAll={place} />
    });

    return (
        <>
          {placesList}
        </>
    );
  }
}
export default PlaceList;