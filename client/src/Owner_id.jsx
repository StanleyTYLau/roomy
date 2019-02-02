import React from 'react';
import axios from 'axios';


class Owner_id extends React.Component {
  constructor() {
    super();
    this.state = {
      placeData: {},
      owners: []
    };

  }

  componentWillMount(){
    //Get the data on every place and insert to state.place
    axios.get(`/owners/58`)
      .then( res => {
        let data = res.data
        console.log(res.data);
        this.setState({ owners: data})

      })
  }


  render() {
    const placesList = this.state.owners

    return (

    <div>
      {placesList.map(place => {
        return (
              <p>{place.neighbourhood}</p>
              )
            })}

    </div>
      );

  }
}

export default Owner_id;