import { Component } from 'react';
import messageImg from 'Images/messageImg.png';

class NoticicationViewEmpty extends Component {
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


