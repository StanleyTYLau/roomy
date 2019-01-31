import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'reactstrap';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class RegisterContainer extends Component {
  constructor() {
    super()
    this.state = {
      category: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      smoker: "",
      pets: "",
      cleanliness: "",
      password: ""
      // postal_code: "",
      // street_number: "",
      // street_name: "",
      // unit_number: "",
      // province: "",
      // city: "",
      // price: "",
      // type: "",
      // number_of_bathrooms: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }


  handleSubmit(event) {

      event.preventDefault();
        var data = {
            postal_code: this.state.postal_code,
            street_number: this.state.street_number,
            street_name: this.state.street_name,
            unit_number: this.state.unit_number,
            province: this.state.province,
            city: this.state.city,
            price: this.state.price,
            type: this.state.type,
            number_of_bathrooms: this.state.number_of_bathrooms
          }
        console.log("data1: ", data)

    fetch('/places', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          }).then(function(data) {
            console.log("data2: ", data)
            if(data === "success"){
               this.setState({msg: "Address updated"});
            }
          }).catch(function(err) {
            console.log(err)
      })
  }


  render() {
    return (
        <div className="contentJumbo">
        <Jumbotron>

            <Form onSubmit={this.handleSubmit}>

                <Row form>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleZip">Postal code</Label>
                      <Input type="text" name="postal_code" id="exampleZip" value={this.state.postal_code} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleZip">Street Number</Label>
                      <Input type="number" name="street_number" id="exampleZip" value={this.state.street_number} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleZip">Unit Number</Label>
                      <Input type="number" name="unit_number" id="exampleZip" value={this.state.unit_number} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <br /> <br />

                 <Col md={6}>
                 <FormGroup>
                   <Label for="exampleAddress">Address</Label>
                   <Input type="text" name="street_name" id="exampleAddress" placeholder="1234 Main St" value={this.state.street_name} onChange={this.handleChange}/>
                 </FormGroup>
                 </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleCity">City</Label>
                      <Input type="text" name="city" id="exampleCity" value={this.state.city} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleState">Province</Label>
                      <Input type="text" name="province" id="exampleState" value={this.state.province} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleZip">Price</Label>
                      <Input type="number" name="price" id="exampleZip" value={this.state.price} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleZip">Number of bathroom</Label>
                      <Input type="number" name="number_of_bathrooms" id="exampleZip" value={this.state.number_of_bathrooms} onChange={this.handleChange}/>
                    </FormGroup>
                  </Col>

                  <br /> <br />

                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleZip">Type</Label>
                      <select name="type" id="exampleZip">
                       onChange={this.handleChange}
                       <option value="">-- Please select --</option>
                       <option name="appartment_building">Appartment building</option>
                       <option name="condo">Condo</option>
                       <option name="private_house">Private House</option>
                       </select>
                    </FormGroup>
                  </Col>


                </Row>

                <br />

                <Button>Submit</Button>

            </Form>
         </Jumbotron>
         </div>
      )}
}


export default RegisterContainer