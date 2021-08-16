import React, { useState, useEffect } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import MediaQuery from 'react-responsive';
import { filesURL } from '../../config/filesBucket';
import api from '../../services/api';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NoPic } from '../../components/Assets';

const PostSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get('/list-post?pg=1&limit=3');
      setPosts(response.data);
    }

    getPosts();
  }, []);

  return (
    <section className="post-section">

      <div className="post-section__inner">

        <h2 className="home-main__title">Best of The HUB<br /> <span>This Week</span></h2>

        <MediaQuery maxDeviceWidth={420}>
          <div className="post-section__slider">
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop>
              { posts.map((post) => (
                <NavLink key={post.post_id} to={`/DIY/${post.post_url}`} className="post-section__box">
                  <div className="post-section__cover" style={{background: `url(${filesURL}${post.post_cover})`}} />
                  <h3>{post.post_title}</h3>

                  <div className="post-section__details">

                    <div className="post-section__author">
                      <img src={post.user_avatar ? `${filesURL}${post.user_avatar}` : NoPic} alt={`${post.user_name} Avatar`} />
                      <p>{post.user_name}</p>
                    </div>

                    <div className="post-section__meta">
                      <span><FaHeart /> {post.post_likes}</span>
                      <span><FaEye /> {post.post_views}</span>
                    </div>

                  </div>
                </NavLink>
              ))}
            </Carousel>
          </div>
        </MediaQuery>

        <MediaQuery minDeviceWidth={421}>
          <div className="post-section__list">
            { posts.map((post) => (
              <NavLink key={post.post_id} to={`/DIY/${post.post_url}`} className="post-section__box">
                <div className="post-section__cover" style={{background: `url(${filesURL}${post.post_cover})`}} />
                <h3>{post.post_title}</h3>

                <div className="post-section__details">

                  <div className="post-section__author">
                    <img src={post.user_avatar ? `${filesURL}${post.user_avatar}` : NoPic} alt={post.user_name} />
                    <p>{post.user_name}</p>
                  </div>

                  <div className="post-section__meta">
                    <span><FaHeart /> {post.post_likes}</span>
                    <span><FaEye /> {post.post_views}</span>
                  </div>

                </div>
              </NavLink>
            ))}
          </div>
        </MediaQuery>

      </div>

    </section>
  );
};

export default PostSection;
