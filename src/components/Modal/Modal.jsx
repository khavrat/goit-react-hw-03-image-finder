import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  handleBackdropClick = e => {
    const { closeModal } = this.props;
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
