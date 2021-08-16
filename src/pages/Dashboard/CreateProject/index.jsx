import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../services/api';
import Alerts from '../../../components/Alerts';
import Spinner from '../../../components/BiggerSpinner';

const CreateProject = ({ isPrivate }) => {
  const userData = useSelector((state) => state.auth);

  const [categoryList, setCategoryList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [title, setTitle] = useState('');
  const [materialFields, setMaterialFields] = useState([{ material: '', meas: '' }]);
  const [steps, setSteps] = useState([{ stepDescription: '', stepCover: '' }]);
  const [modal, setModal] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalMaterial, setModalMaterial] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [cover, setCover] = useState('');
  const [loader, setLoader] = useState(false);

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/list-category');
      setCategoryList(response.data);
    }
    getCategories();
  }, []);

  const handleModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const handleCover = (e) => {
    if (e.target.files[0].size > 1572864) {
      setAlert(true);
      setAlertMessage('Your image is bigger thant 1.5MB!');
      timer();
      return false;
    }

    const name = e.target.value;
    setCover(name.substr(12));
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMaterialList = async (e) => {
    const response = await api.get(`/list-material?pg=1&limit=5000&category=${e.target.value}`);
    setMaterialList(response.data);
  };

  const handleMoreMaterials = () => {
    setMaterialFields([...materialFields, { material: '', meas: '' }]);
  };

  const handleMaterialsFields = (e, index) => {
    const { name, value } = e.target;
    const list = [...materialFields];
    list[index][name] = value;
    setMaterialFields(list);
  };

  const handleRemoveMaterialsFields = (index) => {
    const list = [...materialFields];
    list.splice(index, 1);
    setMaterialFields(list);
  };

  const handleMoreSteps = () => {
    setSteps([...steps, { stepDescription: '' }]);
  };

  const handleSteps = (e, index) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1572864) {
        setAlert(true);
        setAlertMessage('Your image is bigger thant 1.5MB!');
        timer();
        return false;
      }
    }
    const { name, value } = e.target;
    const list = [...steps];
    list[index][name] = value;
    setSteps(list);
  };

  const handleRemoveSteps = (index) => {
    const list = [...steps];
    list.splice(index, 1);
    setSteps(list);
  };

  const handleModalCategory = (e) => {
    setModalCategory(e.target.value);
  };

  const handleModalMaterial = (e) => {
    setModalMaterial(e.target.value);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    api.post('/create-material', {
      name: modalMaterial,
      category: modalCategory,
    })
      .then((res) => {
        const newList = {
          target: {
            value: modalCategory,
          },
        };

        handleMaterialList(newList);
        handleModal();
        setAlert(true);
        setAlertMessage(res.data.message);
        timer();
        setModalCategory('');
        setModalMaterial('');
      })
      .catch((err) => {
        setAlert(true);
        setAlertMessage(err.response.data.error);
        timer();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (materialFields.length < 2) {
      setAlert(true);
      setAlertMessage('You need to choose at least 2 materials');
      timer();
      return false;
    }

    if (!e.target[5].value) {
      setAlert(true);
      setAlertMessage('You need to provide a cover');
      timer();
      return false;
    }

    const formData = new FormData(e.target);
    setLoader(true);
    api.post('/create-post', formData, { headers: { 'content-type': 'multipart/form-data' } })
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
      });
  };

  if (!userData.session && isPrivate) {
    return (<Redirect to="/" />);
  }

  return (
    <>
      <main className="create-post">
        <div className="create-post__inner">

          <h1>Start building your project</h1>

          <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

            <div className="create-post__left">
              <label>
                <p>Select a category</p>
                <select name="categoryId" onChange={handleMaterialList} required>
                  <option value="">Select...</option>
                  {categoryList.map((category) => (
                    <option key={category.category_id} value={category.category_id}>{category.category_title}</option>
                  ))}
                </select>
              </label>

              <label>
                <p>Title</p>
                <input type="text" name="title" value={title} onChange={handleTitle} required />
              </label>

              <label>
                <p>Difficulty</p>
                <select name="difficult" required>
                  <option value="">Select...</option>
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                </select>
              </label>

              <label>
                <p>Duration</p>
                <select name="duration" required>
                  <option value="">Select...</option>
                  <option value="1">1min to 30min</option>
                  <option value="2">30min to 1hr</option>
                  <option value="3">1hr+</option>
                </select>
              </label>

              <label>
                <p>Short description</p>
                <textarea name="desc" required />
              </label>

              <label>
                <span className="create-post__file-btn">Add a Cover 1.5MB</span>
                {cover}
                <input type="file" name="cover" onChange={handleCover} />
              </label>

            </div>

            <div className="create-post__right">
              <p className="create-post__area-title">What will you need?</p>

              <div className="create-post__dynamic">
                {materialFields.map((materialField, index) => (
                  <div key={index} className="create-post__dynamic-material">

                    <select name="material" onChange={(e) => handleMaterialsFields(e, index)} required>
                      <option value="">Select...</option>
                      {materialList.map((material) => (
                        <option key={material.material_id} value={material.material_id}>{material.material_name}</option>
                      ))}
                    </select>

                    <input type="text" placeholder="measurement" name="meas" onChange={(e) => handleMaterialsFields(e, index)} required />

                    <button type="button" onClick={handleRemoveMaterialsFields}><span aria-hidden="true" className="visually-hidden">Remove Button</span><FaTrashAlt /></button>

                  </div>
                ))}
              </div>

              <button type="button" onClick={handleMoreMaterials}>Add another material</button>

              <p>Haven't you find what were you looking for? <button type="button" className="create-post__new-material" onClick={handleModal}>Click Here</button></p>

              <p className="create-post__area-title">How to do it?</p>

              <div className="create-post__dynamic">
                {steps.map((step, index) => (
                  <div key={index} className="create-post__dynamic-step">

                    <h3>Step {index + 1}</h3>

                    <textarea name="stepDescription" onChange={(e) => handleSteps(e, index)} required />

                    <label className="create-post__file-label">
                      <span className="create-post__file-btn">Add a Image 1.5MB</span>
                      {steps[index].stepCover ? step.stepCover.substr(12) : ''}
                      <input type="file" name="stepCover" accept="image/*" onChange={(e) => handleSteps(e, index)} />
                    </label>

                    <button type="button" onClick={handleRemoveSteps}><span aria-hidden="true" className="visually-hidden">Remove Button</span><FaTrashAlt /></button>

                  </div>
                ))}
              </div>
              <button type="button" onClick={handleMoreSteps}>Add another step</button>

              <button type="submit">Create</button>
            </div>
          </form>

        </div>

        <Alerts active={alert} message={alertMessage} />
      </main>

      <div className={modal ? 'modal modal--active' : 'modal'}>
        <form onSubmit={handleModalSubmit}>
          <label>
            <button type="button" onClick={handleModal}>X</button>
            <p>Select a category</p>
            <select name="category" value={modalCategory} onChange={handleModalCategory} required>
              <option value="">Select...</option>
              {categoryList.map((category) => (
                <option key={category.category_id} value={category.category_id}>{category.category_title}</option>
              ))}
            </select>
          </label>
          <label>
            <input type="text" placeholder="Material name" value={modalMaterial} onChange={handleModalMaterial} required />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>

      <Spinner active={loader} />
    </>
  );
};

export default CreateProject;
