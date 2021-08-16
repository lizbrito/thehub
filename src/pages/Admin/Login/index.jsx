import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../../services/api';
import Alerts from '../../../components/Alerts';
import { LogoRegular } from '../../../components/Assets';

const AdminLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setButton(true);
    api.post('/admin/create-session', {
      email,
      password,
    })
      .then((res) => {
        const { dispatch } = props;
        const { data } = res;

        dispatch({
          type: 'ADMIN_LOGIN',
          payload: data,
        });

        setAlert(true);
        setAlertMessage('Welcome!');
        redirectTimer();
      })
      .catch((error) => {
        setAlert(true);
        setAlertMessage(error.response.data.error);
        timer();
        setButton(false);
      });
  };

  return (
    <main className="admin-panel">
      {redirect ? <Redirect to="/admin/home" /> : ''}
      <div className="admin-panel__login">
        <img src={LogoRegular} alt="The Hub Logo" />
        <h2>Control Panel</h2>
        <form className="forms__login" onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
          <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
          <button disabled={button} type="submit">Login</button>
        </form>
      </div>
      <Alerts active={alert} message={alertMessage} />
    </main>
  );
};

export default connect()(AdminLogin);
