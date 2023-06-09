import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    searchField: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const normalizeValue = e.currentTarget.value.toLowerCase();
    this.setState({ searchField: normalizeValue });
  };

  reset = () => {
    this.setState({ searchField: '' });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();

    if (!this.state.searchField.trim()) {
      return alert('Enter a word to search for');
    } else {
      onSubmit(this.state.searchField);
    }

    this.reset();
  };

  render() {
    const { searchField } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <FaSearch size={18} />
          </button>
          <label htmlFor="searchField"></label>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
            name="searchField"
            value={searchField}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
