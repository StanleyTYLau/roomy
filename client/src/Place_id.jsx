import React from 'react';
import axios from 'axios';
import { UncontrolledCollapse, Button, CardBody } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
// import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

const items = [
  {
    src: '/images/room1.png',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: '/images/room2.png',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: '/images/room3.png',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];


class Place_id extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,

      activeIndex: 0,
      placeData: {},
      ownerData: {}

    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

  }


  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount(){
    const placeId = this.props.place_id;

    axios.post(`/places/${placeId}`, {user_info: this.props.user_info})
      .then( res => {
        this.setState({placeData: res.data.place, ownerData: res.data.owner});
        //console.log(res.data)
      })
  };

  render() {

    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption/>
        </CarouselItem>
      );
    });

    return (
      <div>

        <Button id="toggler" onClick={this.toggle} className="button_char">DETAILS</Button>

        <div className="middle_all">
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="pop_windows">
            <ModalHeader className="big_title" toggle={this.toggle}>{this.state.placeData.street_number} {this.state.placeData.street_name}, {this.state.placeData.city}, {this.state.placeData.postal_code}</ModalHeader>
              <Form onSubmit = {this._handleSubmit}>
                <ModalBody>
                  <p className="small_price">Place info:</p>
                  <Carousel
                  className="carousel"
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                  >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                  </Carousel>
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
                        <td>{this.state.placeData.type}</td>
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
                  <p className="small_price">Owner info:</p>
                  <div className="place_owner">
                    <img src="/images/owner.png" alt="Logo"></img>
                    <div className="matching">Owner Matching: {this.state.placeData.matchPercent * 100}%</div>
                  </div>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <th scope="row">Name:</th>
                        <td>{this.state.placeData.price}</td>
                      </tr>
                      <tr>
                        <th scope="row">Gender:</th>
                        <td>{this.state.placeData.price}</td>
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

                </ModalBody>
              <ModalFooter>
                <Button type="submit" className="button_char" onClick={this._handleRequest}>Ask to be Roomys</Button>{' '}
                <Button className="cancel" onClick={this.toggle}>CANCEL</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }

  _handleRequest = e => {
    const placeId = this.props.place_id;
    axios.put(`places/${placeId}`, {user_info: this.props.user_info})
      .then( () => {
        this.toogle();
      });
  }

}

export default Place_id;