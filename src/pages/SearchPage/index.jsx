import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CallToAction from '../../components/CallToAction';
import PostSection from './PostSection';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  // const { search } = useParams();
  const search = useQuery();

  return (
    <>
      <main className="home-main">
        <h1>You are searching for: {search.get('search') || 'Everything'}</h1>
      </main>

      <PostSection search={search.get('search')} />
      <CallToAction />
    </>
  );
};

export default SearchPage;
