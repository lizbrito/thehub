import React, { useState, useEffect } from 'react';
import { NoPic } from '../../components/Assets';
import api from '../../services/api';
import { filesURL } from '../../config/filesBucket';

const Comments = ({ userId, postId, auth }) => {
  const [comment, setComment] = useState('');
  const [load, setLoad] = useState('Login first!');
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getComments() {
      const result = await api.get(`/get-comment?postId=${postId}`);
      setComments(result.data);

      if (auth) {
        setLoad('Send');
      }
    }

    getComments();
  }, [reload, postId]);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoad('Sending');

    api.post('/create-comment', {
      comment,
      userId,
      postId,
    })
      .then((res) => {
        setLoad('Send');
        setReload(true);
      })
      .catch((err) => {
        setLoad('Send');
      });
  };

  const formatDate = new Date();

  return (
    <div className="comments">

      <form className="comments__form" onSubmit={handleSubmit}>
        <label>
          <p>Comments</p>
          <textarea id="comments" name="comments" placeholder="Leave a comment..." onChange={handleComment} />
        </label>
        <button type="submit" disabled={!auth} className="comments__btn">{load}</button>
      </form>

      <div className="comments__list">
        {comments.map((item) => (
          <div key={item.post_comment_id} className="comments__box">
            <div className="comments__meta">
              <img src={item.user_avatar ? `${filesURL}${item.user_avatar}` : NoPic} alt={item.user_name} />
            </div>

            <div className="comments__content">
              <p>{item.user_name}</p>
              <p>{item.post_comment_content}</p>
              <p>{`${formatDate.getMonth(item.post_comment_at) + 1}-${formatDate.getDate(item.post_comment_at)}-${formatDate.getFullYear(item.post_comment_at)} at ${formatDate.getHours(item.post_comment_at) > 9 ? formatDate.getHours(item.post_comment_at) : `0${formatDate.getHours(item.post_comment_at)}`}:${formatDate.getMinutes(item.post_comment_at)}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
