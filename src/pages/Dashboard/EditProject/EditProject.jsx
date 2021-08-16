import React, { useState, useEffect } from 'react';
import { filesURL } from '../../../config/filesBucket';
import api from '../../../services/api';
import Alerts from '../../../components/Alerts';
import Spinner from '../../../components/BiggerSpinner';

const EditProject = ({ slug }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [difficult, setDifficult] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [postId, setPostId] = useState('');
  const [cover, setCover] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [newCover, setNewCover] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [visible, setVisible] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getPostInfo() {
      const result = await api.get(`/show-post/${slug}`);
      setTitle(result.data[0].post_title);
      setCategory(result.data[0].category_id);
      setDifficult(result.data[0].post_difficult);
      setDuration(result.data[0].post_duration);
      setDescription(result.data[0].post_description);
      setPostId(result.data[0].post_id);
      setCover(result.data[0].post_cover);
      setVisible(result.data[0].post_visible);
    }

    async function getCategories() {
      const response = await api.get('/list-category');
      setCategoryList(response.data);
    }

    getCategories();
    getPostInfo();
  }, []);

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleCover = (e) => {
    if (e.target.files[0].size > 1572864) {
      setAlert(true);
      setAlertMessage('Your image is bigger thant 1.5MB!');
      timer();
      return false;
    }

    const name = e.target.value;
    setNewCover(name.substr(12));
  };

  const handleDelete = () => {

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('id', postId);

    setLoader(true);
    api.put(`/update-post/${postId}`, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then((res) => {
        setAlert(true);
        setAlertMessage(res.data.message);
        timer();
        setLoader(false);
      })
      .catch((err) => {
        setAlert(true);
        setAlertMessage(err.response.data.error);
        timer();
        setLoader(false);
      });
  };

  return (
    <>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

        <div className="create-post__left">
          <label>
            <p>Select a category</p>
            <select name="categoryId" value={category} required>
              {categoryList.map((item) => (
                <option key={item.category_id} value={item.category_id}>{item.category_title}</option>
              ))}
            </select>
          </label>

          <label>
            <p>Title</p>
            <input type="text" name="title" value={title} required />
          </label>

          <label>
            <p>Difficulty</p>
            <select name="difficult" value={difficult} required>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </label>

          <label>
            <p>Duration</p>
            <select name="duration" value={duration} required>
              <option value="1">1min to 30min</option>
              <option value="2">30min to 1hr</option>
              <option value="3">1hr+</option>
            </select>
          </label>

          <label>
            <p>Short description</p>
            <textarea name="desc" defaultValue={description} required />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <input type="checkbox" defaultChecked={!visible} name="visible" />
            <div className="toggle"><span /></div>
            <p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Make this project private</p>
          </label>

          <button type="button" onClick={handleDelete}>Delete Project</button>
        </div>

        <div className="create-post__right">

          <div className="create-post__cover-prev" style={{ background: `url(${filesURL}${cover})` }} />

          <label>
            <span className="create-post__file-btn">Change Cover 1.5MB</span>
            {newCover}
            <input type="file" name="cover" onChange={handleCover} />
          </label>

          <button type="submit">Save</button>

        </div>

      </form>

      <Alerts active={alert} message={alertMessage} />

      <Spinner active={loader} />
    </>
  );
};

export default EditProject;
