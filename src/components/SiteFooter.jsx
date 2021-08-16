import React from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { LogoWhite, LogoRegular } from './Assets';

const Footer = () => (
  <section className="site-footer">
    <div className="site-footer__inner">

      <MediaQuery maxDeviceWidth={420}>
        <NavLink to="/" className="site-footer__logo"><img src={LogoWhite} alt="The Hub Logo" /></NavLink>
      </MediaQuery>
      <MediaQuery minDeviceWidth={420}>
        <NavLink to="/" className="site-footer__logo"><img src={LogoRegular} alt="The Hub Logo" /></NavLink>
      </MediaQuery>

      <p>
        <NavLink to="/termsandconditions">Terms & Conditions</NavLink>
        <span>&copy; Team Mako 2020</span>
      </p>

      <ul>
        <li><a href="/#category">Categories</a></li>
        <li><NavLink to="/team">Team</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/signup">Sign In</NavLink></li>
      </ul>
    </div>
  </section>
);

export default Footer;
