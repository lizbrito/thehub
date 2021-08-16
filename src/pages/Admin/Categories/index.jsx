import React, { useState, useEffect } from 'react';
import Panel from '../Panel';
import SubMenu from './SubMenu';
import api from '../../../services/api';

const CreateList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/list-category');
      setCategories(response.data);
    }

    getCategories();
  }, []);

  return (
    <Panel>
      <h1>Categories</h1>

      <SubMenu />

      <table>
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id}>
              <td>{category.category_title}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
      </table>
    </Panel>
  );
};

export default CreateList;
