import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { perPage } from '../../servises/getImages';

class Button extends Component {
  state = {
    isVisibleBtn: false,
  };

  static propTypes = {
    response: PropTypes.object,
    currentPage: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.response !== this.props.response) {
      this.isVisibleBtn();
    }
  }

  onClick = () => {
    this.props.onClick();
  };

  isVisibleBtn = () => {
    const { response, currentPage } = this.props;
    if (
      response.hits.length === 0 ||
      currentPage * perPage >= response.totalHits
    ) {
      this.setState({ isVisibleBtn: false });
    } else if (response.hits.length !== 0) {
      this.setState({ isVisibleBtn: true });
    }
  };

  render() {
    const { isVisibleBtn } = this.state;
    return (
      <>
        {isVisibleBtn && (
          <button className="Button" type="button" onClick={this.onClick}>
            {this.props.children}
          </button>
        )}
      </>
    );
  }
}

export default Button;
