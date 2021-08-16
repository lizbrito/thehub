import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PageHeader from './PageHeader';
import api from '../../services/api';
import Alerts from '../../components/Alerts';

const SignUp = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [policy, setPolicy] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePolicy = (e) => {
    setPolicy(e.target.checked);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const redirectTimer = () => {
    setTimeout(() => {
      setRedirect(true);
    }, 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      api.post('/create-user', {
        name,
        lastName,
        email,
        password,
      })
        .then((res) => {
          setPassword('');
          setConfirmPassword('');
          setAlert(true);
          setAlertMessage(res.data.message);
          redirectTimer();
        })
        .catch((error) => {
          setAlert(true);
          switch (error.response.data.error.errno) {
            case 1062:
              setAlertMessage('This email already has been taken!');
              break;
            default:
              setAlertMessage('Somenthig went wrong, try again!');
          }
          timer();
        });
    } else {
      setAlert(true);
      setAlertMessage('Password confirmation does not match!');
      timer();
    }
  };

  return (
    <main className="sign-up">
      <PageHeader />
      <div className="sign-up__inner">
        <h1>Sign up to The HUB</h1>

        <form className="forms__sign-up" onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input type="text" placeholder="John" min="3" value={name} onChange={handleName} required />
          </label>

          <label>
            <p>Last Name</p>
            <input type="text" placeholder="Doe" min="3" value={lastName} onChange={handleLastName} required />
          </label>

          <label>
            <p>Email</p>
            <input type="email" placeholder="johndoe@email.com" min="3" value={email} onChange={handleEmail} required />
          </label>

          <label>
            <p>Password</p>
            <input type="password" placeholder="8+ Characters" min="8" value={password} onChange={handlePassword} required />
          </label>

          <label>
            <p>Confirm Password</p>
            <input type="password" placeholder="8+ Characters" min="8" value={confirmPassword} onChange={handleConfirmPassword} required />
          </label>

          <label>
            <input type="checkbox" name="policy" value={policy} onChange={handlePolicy} required />
            <p>Creating an account means you are okay with our <NavLink to="/termsandconditions">Terms of Service</NavLink>, <NavLink to="/privacypolicy">Privacy Policy</NavLink>.</p>
          </label>

          <button type="submit">Create Account</button>
        </form>
      </div>
      <Alerts active={alert} message={alertMessage} />
      {redirect ? <Redirect to="/signin" /> : ''}
    </main>
  );
};

export default SignUp;
