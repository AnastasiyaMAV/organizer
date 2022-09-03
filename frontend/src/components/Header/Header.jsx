import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import './Header.scss';

import { path } from '../../utils/constants/constants';
import { localize } from '../../utils/constants/locales/localize';

import LangSwitch from '../../ui/LangSwitch/LangSwitch';

import logo from '../../assets/images/logo.png';

function Header({
  userLang,
  loggedIn,
  logOut,

  isLogo,
}) {
  const location = useLocation();
  const locale = localize(userLang);

  return (
    <header className="header">
      {!loggedIn && (
        <NavLink
          to={path.main}
          className={`header__logo ${isLogo ? 'header__logo_true' : 'header__logo_false'}`}
        >
          <img
            src={logo}
            alt="logo"
          />
        </NavLink>
      )}
      <div className="header__menu_signin">
        <nav className="header__nav-sign">
          <ul className="header__location-items">
            {loggedIn ? (
              <>
                <li className="header__location-item">
                  <NavLink
                    to={path.profile}
                    className={`header__btn-navlink
                    ${
                      location.pathname === path.profile
                        ? 'header__btn-navlink_active'
                        : ''
                    }
                  `}
                  >
                    {locale.header.profile}
                  </NavLink>
                </li>

                <li className="header__location-item">
                  <NavLink
                    to={path.signin}
                    className="header__btn-sign"
                    onClick={() => logOut()}
                  >
                    {locale.header.logout}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="header__location-item">
                  <NavLink to={path.signup} className="header__btn-sign">
                    {locale.header.signup}
                  </NavLink>
                </li>

                <li className="header__location-item">
                  <NavLink to={path.signin} className="header__btn-sign">
                    {locale.header.signin}
                  </NavLink>
                </li>
              </>
            )}

            <li className="header__location-item header__location-item_lang">
              <LangSwitch />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default inject(({ UserStore }) => {
  const {
    userAdmin,
    userLang,
    loggedIn,
    logOut,
  } = UserStore;

  return {
    userAdmin,
    userLang,
    loggedIn,
    logOut,
  };
})(observer(Header));
