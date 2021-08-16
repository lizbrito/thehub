import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import Alerts from '../../components/Alerts';
import api from '../../services/api';

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState('Sign In');
  const [button, setButton] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const redirectTimer = () => {
    setTimeout(() => {
      setRedirect(true);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading('Finding you...');
    setButton(true);

    await api.post('/create-session', {
      email,
      password,
    })
      .then((res) => {
        const { dispatch } = props;
        const { data } = res;

        dispatch({
          type: 'USER_LOGIN',
          payload: data,
        });

        setAlert(true);
        setAlertMessage('Welcome!');
        timer();
        setLoading('We found you!');
        redirectTimer();
      })
      .catch((error) => {
        setAlert(true);
        setAlertMessage(error.response.data.error);
        timer();
        setLoading('Sign In');
        setButton(false);
      });
  };

  return (
    <main className="sign-up">
      {redirect ? <Redirect to="/my-projects" /> : ''}
      <PageHeader />
      <div className="sign-up__inner">
        <h1>Login to The HUB</h1>
        <form className="forms__login" onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="email" placeholder="johndoe@email.com" value={email} onChange={handleEmail} required />
          </label>

          <label>
            <p>Password</p>
            <NavLink to="/">Forgot password?</NavLink>
            <input type="password" name="password" placeholder="8+ Character" min="8" value={password} onChange={handlePassword} required />
          </label>

          <button disabled={button} type="submit">{loading}</button>
        </form>
      </div>
      <Alerts active={alert} message={alertMessage} />
    </main>
  );
};

export default connect()(LogIn);
