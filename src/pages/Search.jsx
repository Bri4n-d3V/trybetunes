import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name } = this.state;
    const MIN_CHARACTERS = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Pesquise por banda ou artista."
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ name.length < MIN_CHARACTERS }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
