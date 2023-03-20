import { Component } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';
import { perPage } from '../../servises/getImages';


class NotificationView extends Component {
  state = {
    isVisibleNtEnd: false,
  };

  static propTypes = {
    isVisibleNtEnd: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  isVisibleNtEnd = () => {
    const { response, currentPage, isError } = this.state;
    console.log('response в isVisibleNtEnd:>> ', response);
    if (
      (response.hits.length === 0 && isError === '') ||
      (currentPage * perPage >= response.totalHits && isError === '')
    ) {
      this.setState({ notification: { isVisibleNtEnd: true } });
    }
  };

  render() {
    console.log('рендер конец картинок в NotificationView');
    const { isVisibleNtEnd } = this.props;
    return (
      <div className={`NtMessage ${isVisibleNtEnd ? 'hide' : ''}`} role="alert">
        {this.props.children}
        <img src={messageImg} width="200" alt="notification message" />
      </div>
    );
  }
}
export default NotificationView;

