import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArtistCard extends Component {
  render() {
    const { artist } = this.props;

    return (
      <div>
        <img src={ artist.artworkUrl100 } alt={ artist.collectionName } />
        <h4>{artist.collectionName}</h4>
        <p>{`${artist.trackCount} músicas`}</p>
        {/* <p>{ artist.releaseDate }</p> */}
        <Link
          to={ `/album/${artist.collectionId}` }
          data-testid={ `link-to-album-${artist.collectionId}` }
        >
          mais informações
        </Link>
      </div>
    );
  }
}

export default ArtistCard;
