import React, { Component } from 'react';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import LoadingGen from '../components/LoadingGen';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      artist: [],
      loading: false,
      searchSuccess: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // função genérica
  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name } = this.state;
    this.setState({ loading: true, artistName: name });

    const searchArtist = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      artist: searchArtist,
      loading: false,
      searchSuccess: true,
    });
  }

  renderForm = () => {
    const { name, loading, artist, artistName } = this.state;
    const MIN_CHARACTERS = 2;

    return (
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
          type="button"
          data-testid="search-artist-button"
          disabled={ name.length < MIN_CHARACTERS }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  renderConditions = () => {
    const { artistName, loading, artist, searchSuccess } = this.state;

    if (searchSuccess && artist.length <= 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    }

    if (loading) return <LoadingGen />;

    if (searchSuccess && artist.length > 0) {
      return (
        <div>
          <h5>
            {`Resultado de álbuns de: ${artistName}`}
          </h5>
          {artist.map((infos) => (
            <ArtistCard
              key={ infos.artistId }
              artist={ infos }
            />))}
        </div>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        {this.renderForm()}
        {this.renderConditions()}
      </div>
    );
  }
}

export default Search;
