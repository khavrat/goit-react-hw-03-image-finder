import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchField: '',
    currentPage: 1,
    imagesResAPI: null,
    // showModal: false,
    selectedImage: null,
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
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
    const { imagesResAPI, selectedImage } = this.state;
    console.log('this.state :>> ', this.state);
    return (
      <>
        <Searchbar onSubmit={this.handelSearchSubmit} />
        <ImageGallery
          searchField={this.state.searchField}
          currentPage={this.state.currentPage}
          imagesResAPI={this.handleResAPI}
          onClickToImage={this.handleImageClick}
        />
        {imagesResAPI && (
          <Button
            onClick={this.handleLoadMoreClick}
            images={this.state.imagesResAPI}
            searchField={this.state.searchField}
          >
            Load more
          </Button>
        )}
        {selectedImage && (
          <Modal
            images={this.state.imagesResAPI}
            closeModal={this.closeModal}
            // selectedImage={this.state.selectedImage}
          >
            <img
              key={selectedImage.id}
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
            />
          </Modal>
        )}
      </>
    );
  }
}
