import React, { useState, useEffect } from 'react';
import { FaHeart, FaEye, FaEdit } from 'react-icons/fa';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../Dashboard';
import api from '../../../services/api';
import NoProject from './NoProject';
import { filesURL } from '../../../config/filesBucket';

const MyProjects = ({ isPrivate }) => {
  const userData = useSelector((state) => state.auth);
  const getLocalStorage = JSON.parse(localStorage.getItem('persist:thehub'));
  const userObj = JSON.parse(getLocalStorage.user);

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get(`/list-post?user=${userObj.user_id}`);
      setPosts(response.data);
    }

    async function getTotal() {
      const response = await api.get(`/count-post?user=${userObj.user_id}`);
      setTotal(response.data[0].total);
    }

    getTotal();
    getPosts();
  }, []);

  if (!userData.session && isPrivate) {
    return (<Redirect to="/" />);
  }

  return (
    <Dashboard nav>
      {total === 0 ? <NoProject /> : (
        <>
          <div className="my-projects">
            {posts.map((post) => (
              <div key={post.post_id} className="my-projects__box">

                <img className="my-projects__cover" src={`${filesURL}${post.post_cover}`} alt={post.post_title} />

                <div className="my-projects__info">
                  <NavLink to={`/edit-project/${post.post_url}`} title="Edit"><span aria-hidden="true" className="visually-hidden">Edit Post</span><FaEdit /></NavLink>
                  <ul>
                    <li><FaHeart /> {post.post_likes}</li>
                    <li><FaEye /> {post.post_views}</li>
                  </ul>
                </div>

                <h2><NavLink to={`/DIY/${post.post_url}`}>{post.post_title}</NavLink></h2>
              </div>
            ))}
          </div>
          {total > 12 ? <button type="button">Load More</button> : ''}
        </>
      )}
    </Dashboard>
  );
};

export default MyProjects;
