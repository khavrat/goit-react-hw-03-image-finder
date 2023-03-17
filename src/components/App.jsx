import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import NoticicationView from './NotificationView/NotificationView';
import Modal from './Modal/Modal';
import { perPage } from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    response: null,
    searchField: '',
    currentPage: 1,
    selectedImage: null,
    isVisibleBtn: false,
    isVisibleNt: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.response !== this.state.response) {
      this.isVisibleBtn();
    }
    if (prevState.searchField !== this.state.searchField) {
      this.setState({ currentPage: 1, isVisibleNt: false });
    }
  }

  isVisibleBtn = () => {
    const { response, currentPage } = this.state;
    if (
      response.hits.length === 0 ||
      currentPage * perPage >= response.totalHits
    ) {
      this.setState({ isVisibleBtn: false, isVisibleNt: true });
    } else if (response.hits.length !== 0) {
      this.setState({ isVisibleBtn: true });
    }
  };

  closeModal = () => {
    this.setState({selectedImage: null});
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
    const { isVisibleBtn, isVisibleNt, selectedImage } = this.state;
    console.log('this.state :>> ', this.state);
    return (
      <>
        <Searchbar onSubmit={this.handelSearchSubmit} />
        <ImageGallery
          getResponseData={this.getResponseData}
          searchField={this.state.searchField}
          currentPage={this.state.currentPage}
          onClickToImage={this.handleImageClick}
        />
        {isVisibleBtn && (
          <Button
            onClick={this.handleLoadMoreClick}
          >
            Load more
          </Button>
        )}
        {isVisibleNt && (
          <NoticicationView isVisibleNt={this.state.isVisibleNt}>
            Pictures of the are over. Look for anything else, please...
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
