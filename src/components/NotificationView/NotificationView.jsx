import { Component } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';
import { perPage } from '../../servises/getImages';

class NotificationView extends Component {
  state = {
    isVisibleNtEnd: false,
  };

  static propTypes = {
    response: PropTypes.object,
    currentPage: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.response !== this.props.response) {
      this.setState({ isVisibleNtEnd: false }, () => this.isVisibleNtEnd());
    }
  }

  isVisibleNtEnd = () => {
    const { response, currentPage, isError } = this.props;
    if (
      (response.hits.length === 0 && isError === '') ||
      (currentPage * perPage >= response.totalHits && isError === '')
    ) {
      this.setState({ isVisibleNtEnd: true });
    }
  };

  render() {
    const { isVisibleNtEnd } = this.state;
    return (
      <>
        {isVisibleNtEnd && (
          <div
            className={`NtMessage ${isVisibleNtEnd ? 'hide' : ''}`}
            role="alert"
          >
            {this.props.children}
            <img src={messageImg} width="200" alt="notification message" />
          </div>
        )}
      </>
    );
  }
}

export default NotificationView;
