import React, { useEffect, useCallback } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Layout } from 'antd';

import { inject, observer } from 'mobx-react';

import './RouteMenu.scss';

import Header from '../../Header/Header';
import Login from '../../Auth/Login/Login';
import Register from '../../Auth/Register/Register';
import Profile from '../../Auth/Profile/Profile';
import MenuSider from '../../MenuSider/MenuSider';
import Users from '../../Users/Users';
import Contacts from '../../Contacts/Contacts';
import Docs from '../../Docs/Docs';

import { path } from '../../../utils/constants/constants';
import { errorMessage } from '../../../utils/constants/messages';

function RouteMenu({
  loggedIn,
  handleGetUserInfo,
  handleLangNotLogged,
  logOut,

  isLogo,
  handleShowLogo,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      handleGetUserInfo(token)
        .then(() => {
          navigate(location.pathname);
        })
        .catch((err) => {
          navigate(path.signin);
          console.log(`${errorMessage.tokenErr} ${err}.`);
        });
    } else if (location.pathname === path.signin) {
      logOut();
      navigate(path.signin);
      console.log(errorMessage.tokenErr);
    }
  }, [handleGetUserInfo, location.pathname, navigate, logOut]);

  useEffect(() => {
    checkToken();

    if (!loggedIn) {
      const lang = localStorage.getItem('lang');

      handleLangNotLogged(lang);
    }
  }, [checkToken, handleLangNotLogged, loggedIn]);

  return (
    <>
      <Header isLogo={isLogo} />
      <main>
        <Layout className="app">
          <MenuSider handleShowLogo={handleShowLogo} />
          <Layout>
            <Routes>
              <Route exact path={path.signup} element={<Register />} />
              {loggedIn && location.pathname === path.signin ? (
                <Route exact path={path.profile} element={<Profile />} />
              ) : (
                <Route exact path={path.signin} element={<Login />} />
              )}

              <Route
                exact
                path={path.profile}
                element={loggedIn ? <Profile /> : <Login />}
              />

              <Route
                exact
                path={path.users}
                element={loggedIn ? <Users /> : <Login />}
              />

              <Route
                exact
                path={path.contacts}
                element={loggedIn ? <Contacts /> : <Login />}
              />

              <Route
                exact
                path={path.docs}
                element={loggedIn ? <Docs /> : <Login />}
              />

              <Route path="*" element={loggedIn ? <Profile /> : <Login />} />
            </Routes>
          </Layout>
        </Layout>
      </main>
    </>
  );
}

export default inject(({ UserStore }) => {
  const {
    loggedIn, handleGetUserInfo, handleLangNotLogged, logOut,
  } = UserStore;

  return {
    loggedIn,
    handleGetUserInfo,
    handleLangNotLogged,
    logOut,
  };
})(observer(RouteMenu));
