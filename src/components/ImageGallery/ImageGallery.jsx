import { Component } from 'react';
import axios from 'axios';
import SearchErrorView from '../ErrorView/ErrorView';
import LoadingView from '../LoadingView/LoadingView';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const URL = 'https://pixabay.com/api/';
const API_KEY = '33239789-edeb40e5557373312058accfd';
const perPage = '12';

class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  async componentDidUpdate(prevProps) {
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
        if (response.data.hits.length === 0) {
          this.setState({
            error: `On "${nextSearch}" found nothing, try again`,
            loading: false,
          });
        } else if (prevPage !== nextPage) {
          this.setState(
            prevState => ({
              images: [...prevState.images, ...response.data.hits],
              loading: false,
              error: null,
            }),
            () => this.props.imagesResAPI(this.state.images)
          );
        } else {
          this.setState(
            {
              images: response.data.hits,
              loading: false,
              error: null,
            },
            () => this.props.imagesResAPI(this.state.images)
          );
        }
      } catch (error) {
        this.setState({ error: error.message, loading: false });
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

  // scrollToLastImage = () => {
  //   const lastImage = document.querySelector('.ImageGalleryItem:last-child');
  //   console.log('lastImage :>> ', lastImage);
  //   if (lastImage) {
  //     lastImage.scrollIntoView({
  //       behavior: 'smooth'
  //     });
  //   }
  // }

  render() {
    const { images, loading, error } = this.state;

    if (loading) {
      return <LoadingView />;
    }
    if (error) {
      return <SearchErrorView message={error} />;
    }
    if (images) {
      return (
        <ul className="ImageGallery" onClick={this.handleImageClick}>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
      );
    }
  }
}

export default ImageGallery;
