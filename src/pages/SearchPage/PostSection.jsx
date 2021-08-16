import React, { useState, useEffect } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import api from '../../services/api';
import { filesURL } from '../../config/filesBucket';
import { NoPic } from '../../components/Assets';

const PostSection = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(9);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get(`/search?pg=1&limit=9&search=${search}`);
      setPosts(response.data);
    }

    async function getTotal() {
      const response = await api.get(`/count-post?search=${search}`);
      setTotal(response.data[0].total);
    }

    getTotal();
    getPosts();
  }, []);

  useEffect(() => {
    async function getNewPosts() {
      const response = await api.get(`/search?pg=1&limit=${page}&search=${search}`);
      setPosts(response.data);
    }

    getNewPosts();
  }, [page, search]);

  const handleMorePosts = () => {
    setPage(page + 6);
  };

  return (
    <section className="post-section">

      <div className="post-section__inner">

        <div className="post-section__list">
          {posts.length > 0 ? posts.map((post) => (
            <NavLink key={post.post_id} to={`/DIY/${post.post_url}`} className="post-section__box">
              <div className="post-section__cover" style={{ background: `url(${filesURL}${post.post_cover})` }} />
              <h3>{post.post_title}</h3>

              <div className="post-section__details">

                <div className="post-section__author">

                  <img src={post.user_avatar ? `${filesURL}${post.user_avatar}` : NoPic} alt={post.user_name} />

                  <p>{post.user_name}</p>
                </div>

                <div className="post-section__meta">
                  <span><FaHeart /> {post.post_like}</span>
                  <span><FaEye /> {post.post_views}</span>
                </div>

              </div>
            </NavLink>
          )) : (<div className="no-result">We couldn't find any project related to your search</div>)}
        </div>
      </div>

      {total > page ? <button type="button" onClick={handleMorePosts}>Load More</button> : ''}

    </section>
  );
};

export default PostSection;
