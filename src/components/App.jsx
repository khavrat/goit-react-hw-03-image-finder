import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import NoticicationView from './NotificationView/NotificationView';
import NoticicationViewEmpty from './NotificationView/NotificationViewEmpty';
import Modal from './Modal/Modal';
import { perPage } from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    response: null,
    searchField: '',
    isError: null,
    currentPage: 1,
    selectedImage: null,
    isVisibleBtn: false,
    notification: {
      isVisibleNtEnd: false,
      isVisibleNtEmpty: false,
    },
  };

  componentDidUpdate(_, prevState) {
    if (prevState.response !== this.state.response) {
      this.isVisibleNt();
      this.isVisibleBtn();
      this.isVisibleNtEnd();
    } else if (prevState.searchField !== this.state.searchField) {
      this.setState({ currentPage: 1 });
      this.isVisibleNt();
    }
  }

  isVisibleBtn = () => {
    const { response, currentPage } = this.state;
    if (
      response.hits.length === 0 ||
      currentPage * perPage >= response.totalHits
    ) {
      this.setState({ isVisibleBtn: false });
    } else if (response.hits.length !== 0) {
      this.setState({ isVisibleBtn: true });
    }
  };

  handleIsVisibleNtEmpty = isVisibleNtEmpty => {
    this.setState({ notification: { isVisibleNtEmpty } });
  };

  isVisibleNt = () => {
    const {
      notification: { isVisibleNtEmpty, isVisibleNtEnd },
      isError,
      searchField,
    } = this.state;

    if (!searchField && !isError) {
      this.setState({ notification: { isVisibleNtEmpty: true } });
    }

    if (isVisibleNtEmpty) {
      this.setState({
        notification: { isVisibleNtEnd: false },
      });
    }

    if (isError) {
      this.setState({
        notification: { isVisibleNtEmpty: false, isVisibleNtEnd: false },
      });
    }

    if (isVisibleNtEnd) {
      this.setState({
        notification: { isVisibleNtEmpty: false },
      });
    }
  };

  isVisibleNtEnd = () => {
    const { response, currentPage, isError } = this.state;
    if (
      (response.hits.length === 0 && isError === null) ||
      (currentPage * perPage >= response.totalHits && isError === null)
    ) {
      this.setState({ notification: { isVisibleNtEnd: true } });
    }
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

  handleLoadMoreClick = currentPage => {
    this.setState({ currentPage });
  };

  render() {
    const {
      searchField,
      isVisibleBtn,
      selectedImage,
      notification: { isVisibleNtEnd, isVisibleNtEmpty },
    } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handelSearchSubmit}
          isVisibleNtEmpty={this.handleIsVisibleNtEmpty}
        />
        {isVisibleNtEmpty && (
          <NoticicationViewEmpty isVisibleNtEmpty={isVisibleNtEmpty}>
            Enter a word to search for
          </NoticicationViewEmpty>
        )}
        <ImageGallery
          getResponseData={this.getResponseData}
          searchField={this.state.searchField}
          currentPage={this.state.currentPage}
          onClickToImage={this.handleImageClick}
          handleIsError={this.handleIsError}
        />
        {isVisibleBtn && (
          <Button onClick={this.handleLoadMoreClick}>Load more</Button>
        )}
        {isVisibleNtEnd && (
          <NoticicationView isVisibleNtEnd={isVisibleNtEnd}>
            This is the last page of the "{searchField}". Look for anything
            else, please...
          </NoticicationView>
        )}
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
