import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Headers from './components/Headers';
import SiteFooter from './components/SiteFooter';
import Home from './pages/Home';
import CategorySelected from './pages/CategorySelected';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import SinglePost from './pages/SinglePost';
import Team from './pages/Team';
import Contact from './pages/Contact';
import MyProjects from './pages/Dashboard/MyProjects';
import Favourites from './pages/Dashboard/Favourites';
import Insights from './pages/Dashboard/Insights';
import EditProfile from './pages/Dashboard/EditProfile';
import CreateProject from './pages/Dashboard/CreateProject';
import AdminLogin from './pages/Admin/Login';
import AdminHome from './pages/Admin/Home';
import AdminCategories from './pages/Admin/Categories';
import AdminMaterials from './pages/Admin/Materials';
import AdminCreateCategory from './pages/Admin/Categories/Create';
import AdminCreateMaterial from './pages/Admin/Materials/Create';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import api from './services/api';
import SearchPage from './pages/SearchPage';
import EditProject from './pages/Dashboard/EditProject';

function Routes() {
  const auth = useSelector((state) => state.auth);
  api.defaults.headers.Authorization = `Bearer ${auth.token}`;

  return (
    <Switch>
      <Route path="/" exact>
        <Headers searchBar={false} />
        <Home />
        <SiteFooter />
      </Route>
      <Route path="/search/:search" exact>
        <Headers searchBar />
        <SearchPage />
        <SiteFooter />
      </Route>
      <Route path="/search" exact>
        <Headers searchBar />
        <SearchPage />
        <SiteFooter />
      </Route>
      <Route path="/category/:slug" exact>
        <Headers searchBar />
        <CategorySelected />
        <SiteFooter />
      </Route>
      <Route path="/contact" exact>
        <Headers searchBar />
        <Contact />
        <SiteFooter />
      </Route>
      <Route path="/DIY/:slug" exact>
        <Headers searchBar />
        <SinglePost />
        <SiteFooter />
      </Route>
      <Route path="/team" exact>
        <Headers searchBar />
        <Team />
        <SiteFooter />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
        <SiteFooter />
      </Route>
      <Route path="/signin" exact>
        <LogIn />
        <SiteFooter />
      </Route>
      <Route path="/my-projects" exact>
        <Headers searchBar />
        <MyProjects isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/favourites" exact>
        <Headers searchBar />
        <Favourites isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/insights" exact>
        <Headers searchBar />
        <Insights isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/create-project" exact>
        <Headers searchBar />
        <CreateProject isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/edit-project/:slug" exact>
        <Headers searchBar />
        <EditProject isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/edit-profile" exact>
        <Headers searchBar />
        <EditProfile isPrivate />
        <SiteFooter />
      </Route>
      <Route path="/admin" exact component={AdminLogin} />
      <Route path="/admin/home" exact isAdmin component={AdminHome} />
      <Route path="/admin/categories" exact isAdmin component={AdminCategories} />
      <Route path="/admin/create-category" exact isAdmin component={AdminCreateCategory} />
      <Route path="/admin/materials" exact isAdmin component={AdminMaterials} />
      <Route path="/admin/create-material" exact isAdmin component={AdminCreateMaterial} />
      <Route path="/privacypolicy" exact component={PrivacyPolicy} />
      <Route path="/termsandconditions" exact component={TermsAndConditions} />
      <Route path="*">
        <Headers searchBar={false} />
        <Home />
        <SiteFooter />
      </Route>
    </Switch>
  );
}

export default Routes;
