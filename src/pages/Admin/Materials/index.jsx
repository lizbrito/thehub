import React, { useState, useEffect } from 'react';
import Panel from '../Panel';
import SubMenu from './SubMenu';
import api from '../../../services/api';

const CreateList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function getMaterials() {
      const response = await api.get('/list-material?pg=1&limit=100');
      setMaterials(response.data);
    }

    getMaterials();
  }, []);

  return (
    <Panel>
      <h1>Materials</h1>

      <SubMenu />

      <table>
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.material_id}>
              <td>{material.material_name}</td>
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
