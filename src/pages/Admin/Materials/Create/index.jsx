import React, { useState, useEffect } from 'react';
import Alerts from '../../../../components/Alerts';
import Panel from '../../Panel';
import api from '../../../../services/api';

const CreateMaterials = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/list-category');
      setCategories(response.data);
    }
    getCategories();
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/admin/create-material', {
      name,
      category,
    })
      .then((res) => {
        setAlert(true);
        setAlertMessage(res.data.message);
        timer();
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

      <form method="post" onSubmit={handleSubmit}>
        <label>
          <p>Category Title</p>
          <select onChange={handleCategory}>
            <option value="0">Select...</option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.category_id} value={categoryItem.category_id}>{categoryItem.category_title}</option>
            ))}
          </select>
        </label>
        <label>
          <p>Category Title</p>
          <input type="text" value={name} onChange={handleName} />
        </label>
        <button type="submit">Add</button>
      </form>
      <Alerts active={alert} message={alertMessage} />
    </Panel>
  );
};

export default CreateMaterials;
