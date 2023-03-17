import { Component } from 'react';
import messageImg from 'Images/messageImg.png';

class NoticicationView extends Component {

  render() {
    const { isVisibleNt } = this.props;
    return (
      <div className={`NtMessage ${isVisibleNt ? 'hide' : ''}`} role="alert">
        {this.props.children}
        <img src={messageImg} width="200" alt="notification message" />
      </div>
    );
  }
}
export default NoticicationView;
