import { Component } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';
import { perPage } from '../../servises/getImages';

class NotificationView extends Component {
  state = {
    isVisibleNtEnd: false,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.response !== this.props.response) {
      console.log('this.props.response :>> ', this.props.response);
     this.setState({ isVisibleNtEnd: false }, () => this.isVisibleNtEnd());
    }
  }

  resetIsVisibleEnd = () => {
  this.setState({isVisibleNtEnd: false})
  }
  
  isVisibleNtEnd = () => {
    const { response, currentPage, isError } = this.props;
    console.log('isError в isVisibleNtEnd:>> ', isError);
    if (
      (response.hits.length === 0 && isError === '') ||
      (currentPage * perPage >= response.totalHits && isError === '')
    ) {
      this.setState({ isVisibleNtEnd: true } );
    } 
  };

  render() {
    console.log('рендер конец картинок в NotificationView');
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
