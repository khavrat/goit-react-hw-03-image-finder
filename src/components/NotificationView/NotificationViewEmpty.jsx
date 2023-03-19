import { Component } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';

class NoticicationViewEmpty extends Component {
  static propTypes = {
    isVisibleNtEmpty: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };
  
  render() {
    const { isVisibleNtEmpty } = this.props;
    return (
      <div
        className={`NtMessageEmpty ${isVisibleNtEmpty ? 'hide' : ''}`}
        role="alert"
      >
        <img src={messageImg} width="200" alt="notification message" />
        {this.props.children}
      </div>
    );
  }
}
export default NoticicationViewEmpty;


