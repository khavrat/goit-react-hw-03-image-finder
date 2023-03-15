import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';

export default class App extends Component {
  state = {
    searchField: '',
    currentPage: 1,
    imagesResAPI: null,
  };

  handelSearchSubmit = searchField => {
    this.setState({ searchField });
  };

  handleLoadMoreClick = currentPage => {
    this.setState({ currentPage });
  };

  handleResAPI = imagesResAPI => {
    this.setState({ imagesResAPI });
  };

  render() {
    const { imagesResAPI } = this.state;
    console.log('this.state :>> ', this.state);
    return (
      <>
        <Searchbar onSubmit={this.handelSearchSubmit} />
        <ImageGallery
          searchField={this.state.searchField}
          currentPage={this.state.currentPage}
          imagesResAPI={this.handleResAPI}
        />
        {imagesResAPI && (
          <Button
            onClick={this.handleLoadMoreClick}
            images={this.state.imagesResAPI}
            searchField={this.state.searchField}
          />
        )}
      </>
    );
  }
}
