import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    console.log('компонент построен модалка');
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('компонент обновился модалка');
    document.body.classList.remove('no-scroll');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log('нажали на ESC- модалка закрылась');
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  handleBackdropClick = e => {
    console.log('нажали на бэкдроп - модалка закрылась');
    const { closeModal } = this.props;
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  render() {
    console.log('рендер в модалке');
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
