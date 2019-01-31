import React, {Component} from 'react';
import { Button } from 'reactstrap';

class Place extends Component {
  render() {
    return (
      <div>
        <div className="places">
          <div className="map_places">
            <div>
              <img src="/images/room_exm.png" alt="room" className="img_place"></img>
            </div>
            <div>
              <div className="price">${this.props.plAll.price}/m</div>
              <div>{this.props.plAll.street_number} {this.props.plAll.street_name}, {this.props.plAll.city}, {this.props.plAll.province}, {this.props.plAll.postal_code}</div>
              <Button type="" className="button_char">DETAILS</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Place;