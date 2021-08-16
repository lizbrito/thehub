import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import api from '../../../services/api';
import Alerts from '../../../components/Alerts';
import Spinner from '../../../components/BiggerSpinner';

const EditStep = ({ id }) => {
  const [oldSteps, setOldSteps] = useState([]);
  const [steps, setSteps] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [del, setDel] = useState('');

  useEffect(() => {
    async function getSteps() {
      const result = await api.get(`/post-step/${id}`);
      setOldSteps(result.data);
    }

    getSteps();
  }, [refresh]);

  const handleDeleteStep = (sid) => {
    api.delete(`/delete-step/${sid}`);
    setRefresh(!refresh);
    handleModal(0);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleModal = (sid) => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }

    setDel(sid);
  };

  const handleSteps = (e) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1572864) {
        setAlert(true);
        setAlertMessage('Your image is bigger thant 1.5MB!');
        timer();
        return false;
      }
    }
    const { name, value } = e.target;
    const list = { ...steps };
    list[name] = value;
    setSteps(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('id', id);
    setLoader(true);
    setRefresh(!refresh);

    api.post('/add-step', formData, { headers: { 'content-type': 'multipart/form-data' } })
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
          <div className="create-post__dynamic">
            <div className="create-post__dynamic-step">

              <h3>New Step</h3>

              <textarea name="stepDescription" onChange={handleSteps} required />

              <label className="create-post__file-label">
                <span className="create-post__file-btn">Add a Image 1.5MB</span>
                {steps.stepCover ? steps.stepCover.substr(12) : ''}
                <input type="file" name="stepCover" accept="image/*" onChange={handleSteps} />
              </label>

            </div>
          </div>

          <button type="submit">Save</button>

        </div>

        <div className="create-post__right">

          <h3>Current Steps</h3>

          <div className="create-post__dynamic">
            {oldSteps.map((step) => (
              <div key={step.post_step_id} className="create-post__old-step">

                <p className="line-height">{step.post_step_description}</p>

                <button type="button" onClick={() => handleModal(step.post_step_id)}><span aria-hidden="true" className="visually-hidden">Remove Button</span><FaTrashAlt /></button>

              </div>
            ))}
          </div>

        </div>

      </form>

      <div className={modal ? 'modal modal--active' : 'modal'}>
        <div className="modal__inner">
          <button type="button" onClick={() => handleModal(0)}>X</button>
          <p>Do you really want to delete this step?</p>
          <button type="button" onClick={() => handleDeleteStep(del)}>Yes</button>
          <button type="button" onClick={() => handleModal(0)}>No</button>
        </div>
      </div>

      <Alerts active={alert} message={alertMessage} />

      <Spinner active={loader} />
    </>
  );
};

export default EditStep;
