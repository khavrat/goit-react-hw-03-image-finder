import { Component } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';


class NoticicationView extends Component {
  static propTypes = {
    isVisibleNtEnd: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };
  
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

