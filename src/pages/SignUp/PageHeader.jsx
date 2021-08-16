import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoWhite } from '../../components/Assets';

const PageHeader = () => (
  <header className="sign-up__header">
    <div className="sign-up__menu-outter">
      <NavLink to="/" className="sign-up__logo"><img src={LogoWhite} alt="The Hub Logo" /></NavLink>

      <ul className="sign-up__menu">
        <li>Already a member?</li>
        <li><NavLink to="/signin" className="site-header__call-to">Sign In</NavLink></li>
      </ul>
    </div>
  </header>
);

export default PageHeader;
