import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { fetchImages } from '../../servises/getImages';
import SearchErrorView from '../ErrorView/ErrorView';
import LoadingView from '../LoadingView/LoadingView';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends PureComponent {
  state = {
    images: null,
    loading: false,
    error: '',
  };

  static propTypes = {
    searchField: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    getResponseData: PropTypes.func.isRequired,
    handleIsError: PropTypes.func.isRequired,
    onClickToImage: PropTypes.func.isRequired,
  };

  async componentDidUpdate(prevProps) {
    const { handleIsError } = this.props;
    const { error } = this.state;
    const prevSearch = prevProps.searchField;
    const nextSearch = this.props.searchField;
    const prevPage = prevProps.currentPage;
    const nextPage = this.props.currentPage;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      try {
        this.setState({ loading: true });

        const data = await fetchImages(nextSearch, nextPage);
        this.props.getResponseData(data);

        if (data.hits.length === 0) {
          throw new Error(`On "${nextSearch}" found nothing, try again`);
        } else if (nextPage > 1) {
          this.setState(
            prevState => ({
              images: [...prevState.images, ...data.hits],
              loading: false,
              error: '',
            }),
            () => handleIsError(error)
          );
        } else {
          this.setState(
            {
              images: data.hits,
              loading: false,
              error: '',
            },
            () => handleIsError(error)
          );
        }
      } catch (error) {
        this.setState({ error: error.message, loading: false }, () => {
          handleIsError(error);
        });
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
    const { images, loading, error } = this.state;

    if (error) {
      return <SearchErrorView message={error} />;
    }
    if (images) {
      return (
        <>
          <ul className="ImageGallery" onClick={this.handleImageClick}>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {loading && <LoadingView />}
        </>
      );
    }
  }
}

export default ImageGallery;
