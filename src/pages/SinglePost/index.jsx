import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaEye, FaStar } from 'react-icons/fa';
import CallToAction from '../../components/CallToAction';
import Comments from './Comments';
import api from '../../services/api';
import { filesURL } from '../../config/filesBucket';
import { NoPic } from '../../components/Assets';
import Alerts from '../../components/Alerts';

const SinglePost = () => {
  const [post, setPost] = useState('');
  const [materials, setMaterials] = useState([]);
  const [steps, setSteps] = useState([]);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [like, setLike] = useState(false);
  const [favourite, setFavorite] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { slug } = useParams();
  const getLocalStorage = JSON.parse(localStorage.getItem('persist:thehub'));
  const userObj = JSON.parse(getLocalStorage.user);

  useEffect(() => {
    async function getPost() {
      const postData = await api.get(`/show-post/${slug}`);
      setPost(postData.data[0]);

      const materialData = await api.get(`/post-material/${postData.data[0].post_id}`);
      setMaterials(materialData.data);

      const stepData = await api.get(`/post-step/${postData.data[0].post_id}`);
      setSteps(stepData.data);

      await api.put(`/post-view?postId=${postData.data[0].post_id}&userId=${postData.data[0].user_id}`);
      setViews(postData.data[0].post_views + 1);
      setLikes(postData.data[0].post_likes);

      if (userObj.user_id) {
        const checkLike = await api.get(`/check-like/${postData.data[0].post_id}`);
        if (checkLike.data[0].check > 0) {
          setLike(true);
        }

        const checkFav = await api.get(`/check-favourite/${postData.data[0].post_id}`);
        if (checkFav.data[0].check > 0) {
          setFavorite(true);
        }
      }
    }

    getPost();
  }, [slug, userObj.user_id]);

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleLike = async () => {
    if (userObj.user_id) {
      const check = await api.get(`/check-like/${post.post_id}`);

      if (check.data[0].check > 0) {
        await api.delete(`/remove-like/${post.post_id}`);
        setLike(false);
        setLikes(likes - 1);
      } else {
        await api.put(`/post-like/${post.post_id}/${post.user_id}`);
        setLike(true);
        setLikes(likes + 1);
      }
    } else {
      setAlert(true);
      setAlertMessage('You must have an account to like posts!');
      timer();
    }
  };

  const handleFavourite = async () => {
    if (userObj.user_id) {
      const check = await api.get(`/check-favourite/${post.post_id}`);

      if (check.data[0].check > 0) {
        await api.delete(`/remove-favourite/${post.post_id}`);
        setFavorite(false);
      } else {
        await api.put(`/post-favourite/${post.post_id}`);
        setFavorite(true);
      }
    } else {
      setAlert(true);
      setAlertMessage('You must have an account to favourite posts!');
      timer();
    }
  };

  return (
    <>
      <div className="single-post">
        <main>

          <div className="single-post__inner">
            <span className="single-post__title">
              <h1>{post.post_title}</h1>
              <span className={favourite ? 'favourite' : ''} onClick={handleFavourite}><FaStar /></span>
            </span>

            <div className="single-post__details">
              <div className="single-post__author">
                <img src={post.user_avatar ? `${filesURL}${post.user_avatar}` : NoPic} alt="Post Author" />
                <p>{post.user_name}</p>
              </div>

              <div className="single-post__meta">
                <span className={like ? 'liked' : ''}><FaHeart onClick={handleLike} /> {likes}</span>
                <span><FaEye /> {views}</span>
              </div>
            </div>

            <img src={post.post_cover ? `${filesURL}${post.post_cover}` : ''} alt="Post Cover" className="single-post__cover" />

            <p className="single-post__description">{post.post_description}</p>

            <div className="single-post__ingredients">
              <div className="single-post__ingredients-inner">

                <span>You are going to need</span>

                <ul>
                  {materials.map((material) => (
                    <li key={material.material_id}>{material.material_name} {material.post_material_meas}</li>
                  ))}
                </ul>

              </div>
            </div>

            <div className="single-post__steps">

              <h2>How to do it yourself</h2>

              <ul>
                {steps.map((step, index) => (
                  <li key={step.post_step_id}>
                    <span>Step {index + 1}</span>

                    <p>{step.post_step_description}</p>

                    {step.post_step_cover ? (<img src={`${filesURL}${step.post_step_cover}`} alt="Step Cover" />) : ''}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </main>

        <Comments userId={post.user_id} postId={post.post_id} auth={!!userObj.user_id} />

        <Alerts active={alert} message={alertMessage} />
      </div>

      <CallToAction />
    </>
  );
};

export default SinglePost;
