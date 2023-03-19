import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  state = {
    currentPage: 1,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { onClick } = this.props;
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      () => onClick(this.state.currentPage)
    );
  };

  render() {
    return (
      <button className="Button" type="button" onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
