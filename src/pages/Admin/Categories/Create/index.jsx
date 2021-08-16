import React, { useState } from 'react';
import Alerts from '../../../../components/Alerts';
import Panel from '../../Panel';
import api from '../../../../services/api';

const CreateCategory = () => {
  const [title, setTitle] = useState([]);
  const [subtitle, setSubtitle] = useState([]);
  const [cover, setCover] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubtitle = (e) => {
    setSubtitle(e.target.value);
  };

  const handleCover = (e) => {
    setCover(e.target.value);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    api.post('/admin/create-category', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then((res) => {
        setAlert(true);
        setAlertMessage(res.data.message);
        timer();
        setCover('');
        setSubtitle('');
        setTitle('');
      })
      .catch((error) => {
        setAlert(true);
        setAlertMessage(error.response.data.sqlMessage);
        timer();
      });
  };

  return (
    <Panel>
      <h1>Create Category</h1>

      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>
          <p>Category Title</p>
          <input type="text" name="title" value={title} onChange={handleTitle} />
        </label>
        <label>
          <p>Category Subtitle</p>
          <input type="text" name="subtitle" value={subtitle} onChange={handleSubtitle} />
        </label>
        <label>
          <p>Select a cover</p>
          <input type="file" name="cover" accept="image/*" value={cover} onChange={handleCover} />
        </label>
        <button type="submit">Add</button>
      </form>
      <Alerts active={alert} message={alertMessage} />
    </Panel>
  );
};

export default CreateCategory;
