import { Component } from 'react';
import { perPage } from '../servises/getImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import NotificationView from './NotificationView/NotificationView';
import NotificationViewEmpty from './NotificationView/NotificationViewEmpty';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    images: null,
    response: null,
    searchField: '',
    isError: '',
    currentPage: 1,
    selectedImage: null,
    // isVisibleBtn: false,
    notification: {
      // isVisibleNtEnd: false,
      isVisibleNtEmpty: false,
    },
  };

  handleLoadMoreClick = prevState => {
    console.log('хэндлер currentPage');
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchField !== this.state.searchField) {
      this.setState({ currentPage: 1 });
    }
  }

  isVisibleBtn = isVisibleBtn => {
    this.setState({ isVisibleBtn });
  };

  handleIsError = isError => {
    console.log('хэндлер ошибки');
    this.setState({ isError });
  };

  closeModal = () => {
    console.log('хэндлер модалки');
    this.setState({ selectedImage: null });
  };

  getResponseData = response => {
    console.log('хэндлер респонсдата');
    this.setState({ response });
  };


  handleImageClick = selectedImage => {
    console.log('хэндлер выбранной картинки для модалки');
    this.setState({ selectedImage });
  };

  handelSearchSubmit = searchField => {
    console.log('хэндлер инпута');
    this.setState({ searchField });
  };

  handleImages = images => {
    console.log('хэндлер images');
    this.setState({ images });
  };

  render() {
    console.log('рендер в арр');

    const {
      isError,
      currentPage,
      searchField,
      response,
      images,
      isVisibleBtn,
      selectedImage,
      notification: { isVisibleNtEnd, isVisibleNtEmpty },
    } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handelSearchSubmit}
          isVisibleNtEmpty={this.isVisibleNtEmpty}
        />
        {isVisibleNtEmpty && (
          <NotificationViewEmpty isVisibleNtEmpty={isVisibleNtEmpty}>
            Enter a word to search for
          </NotificationViewEmpty>
        )}
        <ImageGallery
          getResponseData={this.getResponseData}
          currentPage={currentPage}
          onClick={this.handleLoadMoreClick}
          searchField={this.state.searchField}
          onClickToImage={this.handleImageClick}
          handleIsError={this.handleIsError}
          handleImages={this.handleImages}
        />
        {/* {isVisibleBtn && ( */}
        <Button
          onClick={this.handleLoadMoreClick}
          response={response}
          searchField={searchField}
          currentPage={currentPage}
        >
          Load more
        </Button>
        {/* )}  */}
        {isVisibleNtEnd && (
          <NotificationView response={response} currentPage={currentPage} isError={isError}>
            This is the last page of the "{searchField}". Look for anything
            else, please...
          </NotificationView>
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
