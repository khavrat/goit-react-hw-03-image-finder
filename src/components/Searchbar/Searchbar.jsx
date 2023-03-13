import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';


class Searchbar extends Component {
  state = {
    searchField: '',
  };

    handleChange = e => {
        // console.log(e.currentTarget.value);
        const normalizeValue = e.currentTarget.value.toLowerCase();
      this.setState({ searchField: normalizeValue });
  };

    handleSubmit = (e) => {
        const { searchValue } = this.props;
        e.preventDefault();
        console.log(this.state.searchField);
        searchValue(this.state.searchField);

        // this.setState({ searchField: '' });

    }
    

  render() {
    return (
      <div className="Searchbar">
        <form className="SearchForm">
          <button
            type="submit"
            className="SearchForm-button"
            onSubmit={this.handleSubmit}
          >
            <FaSearch size={18} />
          </button>
          <label htmlFor="searchField"></label>
          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search image..."
            name="searchField"
            value={this.searchField}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
