import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostSection from './PostSection';
import CallToAction from '../../components/CallToAction';

import { filesURL } from '../../config/filesBucket';
import api from '../../services/api';

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function getCategory() {
      const result = await api.get(`/show-category/${slug}`);
      setCategory(result.data);
    }

    getCategory();
  }, [slug]);

  return (
    <>
      <main className="category-section">
        <div className="category-section__inner">

          <div className="hero-section">

            <div className="hero-section__left">
              <h1>{category.category_title}</h1>
              <p>{category.category_subtitle}</p>
            </div>

            <div className="hero-section__right">
              <img src={category.category_cover ? `${filesURL}${category.category_cover}` : ''} alt="Cover Hero" />
            </div>

          </div>

        </div>
      </main>

      {category.category_id ? (<PostSection categoryId={category.category_id} />) : ''}
      <CallToAction />
    </>
  );
};

export default Category;
