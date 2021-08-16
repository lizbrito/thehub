import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { filesURL } from '../config/filesBucket';
import { LogoRegular, NoPic, LogoWhite } from './Assets';
import api from '../services/api';

const MobileHeader = ({ session }) => {
  const [active, setActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expanse, setExpanse] = useState(false);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/list-category');
      setCategories(response.data);
    }

    getCategories();
  }, []);

  const toggleMenu = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const handleExpanse = () => {
    setExpanse(!expanse);
  };

  return (
    <>
      <header className="mobile-header">
        <div className="mobile-header__inner">
          <NavLink to="/" className="mobile-header__logo"><img src={LogoRegular} alt="The Hub Logo" /></NavLink>
          <button type="button" className="mobile-header__btn" onClick={toggleMenu}><span aria-hidden="true" className="visually-hidden">Menu Button</span><FaBars /></button>
        </div>
      </header>

      <div className={active ? 'mobile-menu--active' : 'mobile-menu'}>
        <NavLink to={session ? '/my-projects' : '/'} onClick={toggleMenu} className="mobile-menu__top">
          {session ? (
            <>
              <figure>
                <img src={userData.user_avatar ? filesURL + userData.user_avatar : NoPic} alt="User Avatar" />
              </figure>
              <div className="mobile-menu__info">
                <p className="mobile-menu__name">{userData.user_name}</p>
                <p className="mobile-menu__email">{userData.user_email}</p>
              </div>
            </>
          ) : (
            <figure>
              <img src={LogoWhite} alt="User Avatar" style={{ width: '100%', maxWidth: '100%' }} />
            </figure>
          )}
        </NavLink>
        <div className="mobile-menu__bottom">
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <a onClick={handleExpanse}><FaChevronDown />Categories</a>
          <div className="mobile-menu__category">
            <ul className={expanse ? 'mobile-menu__list--active' : 'mobile-menu__list'}>
              {categories.map((category) => (
                <li key={category.category_id}><NavLink to={`/category/${category.category_slug}`}>{category.category_title}</NavLink></li>
              ))}
            </ul>
          </div>
          <NavLink to="/team" onClick={toggleMenu}>Team</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
          {!session ? (
            <>
              <NavLink to="/signin" onClick={toggleMenu}>Sign In</NavLink>
              <NavLink to="/signup" className="mobile-menu__call-to" onClick={toggleMenu}>Sign Up</NavLink>
            </>
          ) : (<NavLink to="/create-project" className="mobile-menu__call-to" onClick={toggleMenu}>Create new Project</NavLink>)}
        </div>
        <button type="button" className="mobile-menu__close-btn" onClick={toggleMenu}><span aria-hidden="true" className="visually-hidden">Close Button</span><FaTimes /></button>
      </div>
    </>
  );
};

export default MobileHeader;
