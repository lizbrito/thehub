import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filesURL } from '../../../config/filesBucket';
import { NoPic } from '../../../components/Assets';
import api from '../../../services/api';
import Alerts from '../../../components/Alerts';

const EditProfile = ({ isPrivate }) => {
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData() {
      if (localStorage.getItem('persist:thehub')) {
        const getLocalStorage = JSON.parse(localStorage.getItem('persist:thehub'));
        const userObj = JSON.parse(getLocalStorage.user);

        if(userObj.user_id){

          const response = await api.get(`/show-user/${userObj.user_id}`);
          setName(response.data[0].user_name);
          setLastName(response.data[0].user_last_name);
          setBio(response.data[0].user_bio);

          if (response.data[0].user_avatar) {
            setAvatar(`${filesURL}${response.data[0].user_avatar}`);
          }
        }
      }
    }

    getUserData();
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleAvatar = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    api.put('/update-user', {
      name,
      lastName,
      bio,
    })
      .then((res) => {
        dispatch({ type: 'USER_UPDATE', payload: { user: { user_name: name } } });
        setAlert(true);
        setAlertMessage('Profile Updated!');
        timer();
      })
      .catch((err) => {
        setAlert(true);
        setAlertMessage('Something went wrong, try again!');
        timer();
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (confirmPassword === password) {
      api.put('/update-password', {
        oldPassword,
        password,
      })
        .then((res) => {
          setAlert(true);
          setAlertMessage('Password Changed!');
          timer();
        })
        .catch((err) => {
          setAlert(true);
          setAlertMessage(err.response.data.error);
          timer();
        });
    } else {
      setAlert(true);
      setAlertMessage('Password confirmation doesn\'t match');
    }
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    if (!e.target[0].value) {
      setAlert(true);
      setAlertMessage('You need to select a picture');
      timer();
      return false;
    }

    const formData = new FormData(e.target);
    formData.append('name', name);

    api.put('/update-avatar', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then((res) => {
        dispatch({ type: 'AVATAR_UPDATE', payload: { user: { user_avatar: res.data.avatar } } });
        setAlert(true);
        setAlertMessage(res.data.message);
        timer();
      })
      .catch((err) => {
        setAlert(true);
        setAlertMessage(err.response.data.error);
        timer();
      });
  };

  if(!userData.session && isPrivate) {
    return (<Redirect to="/" />);
  }

  return (
    <main className="dashboard">
      <div className="dashboard__inner--profile">
        <section className="forms__change-pic">
          <form method="post" encType="multipart/form-data" onSubmit={handleAvatarSubmit}>
            <label>
              <figure>
                <div className="avatar__img" style={{ background: `url(${avatar || NoPic})` }} />
                <figcaption>Edit</figcaption>
              </figure>
              <input type="file" name="avatar" accept="image/*" onChange={handleAvatar} />
            </label>

            <p>{user.user_name}</p>
            <p>{user.user_email}</p>

            <button type="submit">Save</button>
          </form>
        </section>

        <section className="dashboard__panel--alt">
          <h1 className="forms__profile-title">Account Information</h1>
          <form className="forms__profile" onSubmit={handleProfileSubmit}>
            <label>
              <p>Name</p>
              <input type="text" value={name} onChange={handleName} />
            </label>

            <label>
              <p>Last Name</p>
              <input type="text" value={lastName} onChange={handleLastName} />
            </label>

            <label>
              <p>Bio</p>
              <textarea onChange={handleBio} defaultValue={bio} />
            </label>

            <button type="submit">Save</button>
          </form>

          <h1 className="forms__profile-title">Password</h1>
          <form className="forms__profile" onSubmit={handlePasswordSubmit}>
            <label>
              <p>Old Password</p>
              <input type="password" value={oldPassword} onChange={handleOldPassword} min="8" required />
            </label>

            <label>
              <p>New Password</p>
              <input type="password" value={password} onChange={handlePassword} min="8" required />
            </label>

            <label>
              <p>Confirm Password</p>
              <input type="password" value={confirmPassword} onChange={handleConfirmPassword} min="8" required />
            </label>

            <button type="submit">Change</button>
          </form>

        </section>

      </div>
      <Alerts active={alert} message={alertMessage} />
    </main>
  );
};

export default EditProfile;
