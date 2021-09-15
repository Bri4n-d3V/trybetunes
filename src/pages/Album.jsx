import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artist: '',
      album: '',
      api: false,
    };
  }

  componentDidMount() {
    this.handleAPI();
  }

  handleAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    // console.log(songs);
    this.setState({
      songs,
      artist: songs[0].artistName,
      album: songs[0].collectionName,
      api: true,
    });
  };

  renderResults = () => {
    const { songs, artist, album, api } = this.state;

    if (api) {
      return (
        <div>
          <h4 data-testid="artist-name">{artist}</h4>
          <h4 data-testid="album-name">{album}</h4>
          {songs.map((song, i) => i > 0 && <MusicCard key={ i } { ...song } />)}
        </div>
      );
    }
  }

  render() {
    // const {  } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {this.renderResults()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
