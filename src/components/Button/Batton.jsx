import { Component } from 'react';

class Button extends Component {
  state = {
    currentPage: 1,
    // isVisible: null,
  };

  // componentDidMount() {
  //   this.isVisible();
  // }

  componentDidUpdate(prevProps) {
    console.log('prevProps.searchField :>> ', prevProps.searchField);
    console.log('this.props.searchField :>> ', this.props.searchField);

    // if (prevProps.images !== this.props.images) {
    //   this.isVisible()
    //   this.props.isVisibleBtn(this.state.isVisible);

    // }
    // if (prevProps.searchField !== this.props.searchField) {
    //   this.setState({currentPage: 1})
    // }
  }

  // isVisible = () => {
  //   const { images, totalImages } = this.props;
  //   // console.log('images.length', images.length);
  //      console.log('totalImages', totalImages.totalHits);
 
  //   if ( images ) {
  //     this.setState({ isVisible: true }, () => {
  //       console.log('isVisible', this.state.isVisible);
  //     });
  //     } if (images.length === 0) {
  //       this.setState({ isVisible: false },() => { console.log('isVisible', this.state.isVisible) });
  //     } if (images.length === totalImages.totalHits) {
  //       this.setState(
  //         { isVisible: false },
  //         () => { console.log('isVisible', this.state.isVisible) }
  //       );
  //   }
  // };

  onClick = () => {
    const { onClick } = this.props;
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      () => onClick(this.state.currentPage)
    );
  };

  render() {
    return (
      <button className="Button" type="button" onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
