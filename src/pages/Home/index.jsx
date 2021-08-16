import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import CallToAction from '../../components/CallToAction';
import { HeroImg } from '../../components/Assets';
import PostSection from './PostSection';
import CategoryList from './CategoryList';

const Home = () => {
  const [search, setSearch] = useState('');
  const [trueSearch, setTrueSearch] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
    setTrueSearch(search);
  };

  return (
    <>
      {redirect ? (<Redirect to={`/search?search=${trueSearch}`} />) : ''}
      <main className="home-main">
        <div className="home-main__inner">

          <section className="hero-section">

            <div className="hero-section__left">
              <h1>Discover your <br /> DIY for today</h1>

              <p>The HUB is the best place to <br /> find & showcase any project<br /> that <strong>you can do it yourself</strong></p>

              <form onSubmit={handleSubmit}>
                <label><span className="visually-hidden">What do you want to create?</span>
                  <input type="search" placeholder="What do you want to create?" onChange={handleSearch} />
                </label>
                <button type="submit"><span className="visually-hidden">Search Button</span><FaSearch /></button>
              </form>
            </div>

            <div className="hero-section__right">
              <img src={HeroImg} alt="The Hub Hero" />
            </div>

          </section>

        </div>
      </main>

      <PostSection />
      <CategoryList />
      <CallToAction />
    </>
  );
};

export default Home;
