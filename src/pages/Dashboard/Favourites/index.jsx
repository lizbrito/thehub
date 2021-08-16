import React, { useState, useEffect } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { NavLink, Redirect } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { NoPic } from '../../../components/Assets';
import { filesURL } from '../../../config/filesBucket';
import api from '../../../services/api';
import { useSelector } from 'react-redux';

const Favourites = ({ isPrivate }) => {
  const userData = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const result = await api.get('/favourite-list');
      setPosts(result.data);
    }

    getPosts();
  }, []);

  if(!userData.session && isPrivate) {
    return (<Redirect to="/" />);
  }

  return (
    <Dashboard nav>
      <div className="favourite-list">
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
    </Dashboard>
  );
};

export default Favourites;
