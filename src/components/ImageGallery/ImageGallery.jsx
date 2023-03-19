import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchErrorView from '../ErrorView/ErrorView';
import LoadingView from '../LoadingView/LoadingView';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const URL = 'https://pixabay.com/api/';
const API_KEY = '33239789-edeb40e5557373312058accfd';
const perPage = '12';

class ImageGallery extends Component {
  state = {
    response: null,
    loading: false,
    errorMessage: '',
    currentPage: 1,
  };

  static propTypes = {
    searchField: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    getResponseData: PropTypes.func.isRequired,
    handleIsError: PropTypes.func.isRequired,
    onClickToImage: PropTypes.func.isRequired,
  };

  async componentDidUpdate(prevProps) {
    const { getResponseData, handleIsError } = this.props;
    const prevSearch = prevProps.searchField;
    const nextSearch = this.props.searchField;
    const prevPage = prevProps.currentPage;
    const nextPage = this.props.currentPage;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ loading: true });

      try {
        const response = await axios.get(
          `${URL}?q=${nextSearch}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${nextPage}`
        );
        this.setState({ response: response.data }, () =>
          getResponseData(this.state.response)
        );

        if (response.data.hits.length === 0) {
          this.setState(
            {
              errorMessage: `On "${nextSearch}" found nothing, try again`,
              loading: false,
            },
            () => handleIsError(this.state.errorMessage)
          );
        } else if (nextPage > 1) {
          this.setState(
            prevState => ({
              images: [...prevState.images, ...response.data.hits],
              loading: false,
              errorMessage: null,
            }),
            () => handleIsError(this.state.errorMessage)
          );
        } else {
          this.setState(
            {
              images: response.data.hits,
              loading: false,
              errorMessage: null,
            },
            () => handleIsError(this.state.errorMessage)
          );
        }
      } catch (error) {
        this.setState({ errorMessage: error.message, loading: false });
      }
    }
  }

  handleImageClick = e => {
    const { images } = this.state;
    const { onClickToImage } = this.props;

    const selectedImage = images.find(
      image => image.webformatURL === e.target.src
    );
    onClickToImage(selectedImage);
  };

  render() {
    const { images, loading, errorMessage } = this.state;

    if (errorMessage) {
      return <SearchErrorView message={errorMessage} />;
    }
    if (images) {
      return (
        <>
          <ul className="ImageGallery" onClick={this.handleImageClick}>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
            {}
          </ul>
          {loading && <LoadingView />}
        </>
      );
    }
  }
}

export default ImageGallery;
export { perPage };
