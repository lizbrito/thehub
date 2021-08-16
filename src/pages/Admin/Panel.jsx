import React from 'react';
import { NavLink } from 'react-router-dom';

const Panel = ({ children }) => (
  <main className="admin-panel">
    <div className="admin-panel__top-nav">
      <p>The Hub</p>
    </div>
    <div className="admin-panel__side-nav">
      <nav>
        <NavLink to="/admin/home">Home</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/materials">Materials</NavLink>
      </nav>
    </div>
    <div className="admin-panel__body">
      {children}
    </div>
  </main>
);

export default Panel;
