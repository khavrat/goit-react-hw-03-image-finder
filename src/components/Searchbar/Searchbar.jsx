import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    searchField: '',
  };

  handleChange = e => {
  console.log('обработка поля в Searchbar');

    const normalizeValue = e.currentTarget.value.toLowerCase();
    this.setState({ searchField: normalizeValue });
  };

  reset = () => {
    console.log('очистка поля в Searchbar');
    this.setState({ searchField: '' });
  };

  handleSubmit = e => {
    console.log('сабмит формы в Searchbar');
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
console.log('рендер в Searchbar');
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
            value={this.state.searchField}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
