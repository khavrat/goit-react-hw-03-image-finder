import { Component } from 'react';
import { fetchImages } from '../../servises/getImages';
import SearchErrorView from '../ErrorView/ErrorView';
import LoadingView from '../LoadingView/LoadingView';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('копронент обновился в ImageGallery');
    const prevSearch = prevProps.searchField;
    const nextSearch = this.props.searchField;
    const prevPage = prevProps.currentPage;
    const nextPage = this.props.currentPage;
    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      console.log('если не равен запрос или страница в ImageGallery');
      try {
        this.setState({ loading: true });

        const data = await fetchImages(nextSearch, nextPage);
        console.log('data в ImageGallery:>> ', data);
        this.props.getResponseData(data);

        if (data.hits.length === 0) {
          console.log('если массив =0 в ImageGallery');
          throw new Error(`On "${nextSearch}" found nothing, try again`);
        } else if (nextPage > 1) {
          console.log('если следующая страница >0 в ImageGallery');
          this.setState(
            prevState => ({
              images: [...prevState.images, ...data.hits],
              loading: false,
              error: '',
            }),
            () => this.props.handleIsError(this.state.error)
          );
        } else {
          console.log('если запрос первый в ImageGallery');
          this.setState(
            {
              images: data.hits,
              loading: false,
              error: '',
            },
            () => this.props.handleIsError(this.state.error)
          );
        }
      } catch (error) {
        console.log('catch error в ImageGallery', error);
        this.setState({ error: error.message, loading: false }, ()=>{this.props.handleIsError(this.state.error)});
      }
    }
  }

  handleImageClick = e => {
    console.log('обработчик клика в картинку в ImageGallery');
    const { images } = this.state;
    const { onClickToImage } = this.props;

    const selectedImage = images.find(
      image => image.webformatURL === e.target.src
    );
    onClickToImage(selectedImage);
  };

  render() {
    console.log('рендер в ImageGallery');
    const { images, loading, error } = this.state;
    console.log(images);

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
