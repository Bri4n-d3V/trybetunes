import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingGen from './LoadingGen';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleChange = async ({ target }) => {
    const { song } = this.props;

    this.setState({ loading: true });

    if (target.checked) {
      await addSong(song);
      this.setState({ loading: false });
    } else {
      await removeSong(song);
      this.setState({ loading: false });
    }
  }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { loading } = this.state;

    return (
      <div>
        {loading ? <LoadingGen /> : null}
        <h5>{trackName}</h5>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        {/* TAG LABEL BUGA O CÓDIGO !!!! */}
        <input
          type="checkbox"
          onChange={ this.handleChange }
          data-testid={ `checkbox-music-${trackId}` }
        />

      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape().isRequired,
};

export default MusicCard;
