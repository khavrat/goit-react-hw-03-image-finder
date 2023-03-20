import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import NotificationView from './NotificationView/NotificationView';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    response: null,
    searchField: '',
    isError: '',
    currentPage: 1,
    selectedImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchField !== this.state.searchField) {
      this.setState({ currentPage: 1 });
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleIsError = isError => {
    this.setState({ isError });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  getResponseData = response => {
    this.setState({ response });
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
  };

  handelSearchSubmit = searchField => {
    this.setState({ searchField });
  };

  render() {
    const {
      isError,
      currentPage,
      searchField,
      response,
      selectedImage,
    } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handelSearchSubmit}
        />
        <ImageGallery
          getResponseData={this.getResponseData}
          currentPage={currentPage}
          searchField={this.state.searchField}
          onClickToImage={this.handleImageClick}
          handleIsError={this.handleIsError}
        />
        <Button
          onClick={this.handleLoadMoreClick}
          response={response}
          searchField={searchField}
          currentPage={currentPage}
        >
          Load more
        </Button>
        <NotificationView
          response={response}
          currentPage={currentPage}
          isError={isError}
        >
          This is the last page of the "{searchField}". Look for anything else,
          please...
        </NotificationView>
        {selectedImage && (
          <Modal closeModal={this.closeModal}>
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
