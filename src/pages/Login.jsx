import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import LoadingGen from '../components/LoadingGen';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  // função genérica.
  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  // função do Rod
  handleSubmit = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const MIN_INPUTS = 3;

    if (loading) return <LoadingGen />;
    if (redirect) return <Redirect to="/search" />;

    return (
      <forms data-testid="page-login">
        <label htmlFor="name">
          Login
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Digite seu nome"
            data-testid="login-name-input"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ name.length < MIN_INPUTS } // Lógica dentro do atributo (Léo)
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </forms>
    );
  }
}

export default Login;
