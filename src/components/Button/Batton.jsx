import { Component } from 'react';

class Button extends Component {
  state = {
    currentPage: 1,
    isVisible: false,
  };

  componentDidMount() {
    this.isVisibleBtn();
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps.searchField :>> ', prevProps.searchField);
    console.log('this.props.searchField :>> ', this.props.searchField);

    if (prevProps.images !== this.props.images) {
      this.isVisibleBtn();
    }
    if (prevProps.searchField !== this.props.searchField) {
      this.setState({currentPage: 1})
    }
  }

  isVisibleBtn = () => {
    const { images } = this.props;
    if (images && !this.state.isVisible) {
      this.setState({ isVisible: true });
    } else if (!images && this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  };

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
      <button type="button" onClick={this.onClick}>
        Loade more
      </button>
    );
  }
}

export default Button;
