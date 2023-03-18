import { Component } from 'react';
import messageImg from 'Images/messageImg.png';

class NoticicationView extends Component {

  render() {
    const { isVisibleNtEnd } = this.props;
    return (
      <div className={`NtMessage ${isVisibleNtEnd ? 'hide' : ''}`} role="alert">
        {this.props.children}
        <img src={messageImg} width="200" alt="notification message" />
      </div>
    );
  }
}
export default NoticicationView;

