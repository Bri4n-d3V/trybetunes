import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingGen from '../components/LoadingGen';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artist: '',
      album: '',
      api: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  handleGetMusics = async () => {
    this.setState({
      loading: true,
    });
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      songs,
      artist: songs[0].artistName,
      album: songs[0].collectionName,
      api: true,
      loading: false,
    });
  }

  renderResults = () => {
    const { songs, artist, album, api, loading } = this.state;

    if (loading) return <LoadingGen />;

    if (api && !loading) {
      return (
        <div>
          <h4 data-testid="artist-name">{artist}</h4>
          <h4 data-testid="album-name">{album}</h4>
          {songs.map(
            (song, i) => i > 0 && <MusicCard
              key={ i }
              song={ song }
            />,
          )}
        </div>
      );
    }
  }

  render() {
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
