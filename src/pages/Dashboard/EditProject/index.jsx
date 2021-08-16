import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProject from './EditProject';
import EditStep from './EditStep';
import EditMaterial from './EditMaterial';
import api from '../../../services/api';

const Wrapper = ({ isPrivate }) => {
  const userData = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [id, setId] = useState();
  const [catId, setCatId] = useState();
  const [showProject, setShowProject] = useState(true);
  const [showSteps, setShowSteps] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  useEffect(() => {
    async function getId() {
      const result = await api.get(`/get-id?slug=${slug}`);
      setId(result.data[0].post_id);
      setCatId(result.data[0].category_id);
    }

    getId();
  }, []);

  // if (!userData.session && isPrivate) {
  //   return (<Redirect to="/" />);
  // }

  const handleProject = () => {
    setShowSteps(false);
    setShowProject(true);
    setShowMaterials(false);
  };

  const handleSteps = () => {
    setShowSteps(true);
    setShowProject(false);
    setShowMaterials(false);
  };

  const handleMaterials = () => {
    setShowSteps(false);
    setShowProject(false);
    setShowMaterials(true);
  };

  return (
    <>
      <main className="create-post">
        <div className="create-post__inner">

          <h1>Editing</h1>

          <div className="create-post__submenu">
            <button type="button" onClick={handleProject}>Edit Project</button>
            <button type="button" onClick={handleSteps}>Edit Steps</button>
            <button type="button" onClick={handleMaterials}>Edit Materials</button>
          </div>

          {showProject ? <EditProject slug={slug} /> : ''}
          {showSteps ? <EditStep id={id} /> : ''}
          {showMaterials ? <EditMaterial id={id} cat={catId} /> : ''}

        </div>
      </main>
    </>
  );
};

export default Wrapper;
