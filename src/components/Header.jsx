import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingGen from './LoadingGen';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = async () => {
    /* const { name } = this.state;
    this.setState({ loading: true });
    await getUser({ name }),
    this.setState({ name, loading: false }); */
    this.setState({ loading: true });
    const user = await getUser(); // Ajuda do Rod com User
    this.setState({ name: user.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header data-testid="header-component">
        header
        <h4 data-testid="header-user-name">
          {loading ? <LoadingGen /> : name}
        </h4>
        <div>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;
