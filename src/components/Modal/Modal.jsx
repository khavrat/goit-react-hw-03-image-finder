import { Component } from 'react';

class Modal extends Component {
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
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
