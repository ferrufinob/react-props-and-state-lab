import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  render() {
    // render each pets component bases on the pets props passed in
    const pets = this.props.pets.map((pet) => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet} />
    ));
    console.log(pets);
    return (
      <div className="ui cards">
        PET COMPONENT SHOULD GO HERE
        {pets}
      </div>
    );
  }
}

export default PetBrowser;
