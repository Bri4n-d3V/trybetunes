import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
  render() {
    const { artist } = this.props;
    const { artworkUrl100, collectionName, trackCount, collectionId } = artist;

    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h4>{collectionName}</h4>
        <p>{`${trackCount} músicas`}</p>
        {/* <p>{ releaseDate }</p> */}
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          mais informações
        </Link>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  artist: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default ArtistCard;
