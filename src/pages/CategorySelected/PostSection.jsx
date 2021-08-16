import React, { useState, useEffect } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import api from '../../services/api';
import { filesURL } from '../../config/filesBucket';
import { NoPic } from '../../components/Assets';

const PostSection = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(9);
  const [materialList, setMaterialList] = useState([]);
  const [time, setTime] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    async function getMaterials() {
      const response = await api.get(`/list-material?pg=1&limit=5000&category=${categoryId}`);
      setMaterialList(response.data);
    }

    getMaterials();
  }, [categoryId]);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get(`/category-filter?pg=1&limit=${page}&categoryId=${categoryId}&material=${materialId}&time=${time}&difficulty=${difficulty}`);
      setPosts(response.data);
    }

    async function getTotal() {
      const response = await api.get(`/count-filter?categoryId=${categoryId}&material=${materialId}&time=${time}&difficulty=${difficulty}`);
      setTotal(response.data[0].total);
    }

    getPosts();
    getTotal();
  }, [page, categoryId, time, materialId, difficulty]);

  const handleMorePosts = () => {
    setPage(page + 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMaterialId(e.target[0].value);
    setTime(e.target[1].value);
    setDifficulty(e.target[2].value);
  };

  return (
    <section className="post-section">

      <div className="post-section__inner">

        <form onSubmit={handleSubmit}>
          <label>
            <p>Made With</p>
            <select name="m">
              <option value="">All</option>
              {materialList.map((material) => (
                <option key={material.material_id} value={material.material_id}>{material.material_name}</option>
              ))}
            </select>
          </label>

          <label>
            <p>Time to make it</p>
            <select name="t">
              <option value="">All</option>
              <option value="1">1min to 30min</option>
              <option value="2">30min to 1hr</option>
              <option value="3">1hr+</option>
            </select>
          </label>

          <label>
            <p>Difficulty</p>
            <select name="d">
              <option value="">All</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </label>

          <button type="submit">Filter</button>
        </form>

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
                  <span><FaHeart /> {post.post_likes}</span>
                  <span><FaEye /> {post.post_views}</span>
                </div>

              </div>
            </NavLink>
          )) : (<div className="no-result">We couldn't find any project related to your filter</div>)}
        </div>
      </div>

      {total > page ? <button type="button" onClick={handleMorePosts}>Load More</button> : ''}

    </section>
  );
};

export default PostSection;
