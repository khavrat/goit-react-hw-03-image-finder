import { Component } from 'react';

class Button extends Component {
  state = {
    currentPage: 1,
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
