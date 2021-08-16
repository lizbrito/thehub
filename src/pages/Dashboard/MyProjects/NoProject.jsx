import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoGrey } from '../../../components/Assets';

const NoProject = () => (
  <div className="no-project">
    <img src={LogoGrey} alt="The Hub Logo" />
    <h3>Create your first project</h3>
    <p>Upload a set of steps to create your first DIY project.</p>
    <NavLink to="/create-project">Create a Project</NavLink>
  </div>
);

export default NoProject;
