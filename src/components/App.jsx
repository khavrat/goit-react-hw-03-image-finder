import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {

  handelSearchSubmit = () => {
    // console.log(searchValue);
  }

  render() {
    return (
      <>
        <Searchbar searchValue={this.handelSearchSubmit} />
      </>
    );
  }
}
