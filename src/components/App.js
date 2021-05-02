import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (e) => {
    // update state.filters.type
    this.setState(
      {
        filters: {
          // make a copy
          ...this.state.filters,
          type: e.target.value,
        },
      },
      () => console.log("in filter", this.state.filters.type)
    );
  };

  onFindPetsClick = () => {
    // fetch a list of pets using fetch()
    // /api/pets/ + query parameter(this.state.filters.type)
    let url;
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    } else {
      url = "/api/pets?type=" + this.state.filters.type;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({ pets: data }, () => console.log("in fetch", this.state))
      );
  };

  onAdoptPet = (id) => {
    // take in an id for pet
    // find matching pet in state.pets
    // set the isAdopted property to true
    const pets = this.state.pets.map((pet) => {
      return pet.id === id
        ? { ...pet, isAdopted: true }
        : { ...pet, isAdopted: false };
    });

    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
