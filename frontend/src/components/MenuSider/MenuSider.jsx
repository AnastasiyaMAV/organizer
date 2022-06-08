import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ReadOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { path } from '../../utils/constants/constants';
import { localize } from '../../utils/constants/locales/localize';
import './MenuSider.scss';
import logo from '../../assets/images/logo.png';

const { Sider } = Layout;

function MenuSider({
  userLang,
  loggedIn,
  userAdmin,

  handleShowLogo,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const locale = localize(userLang);
  return (
    (
      loggedIn && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={async () => {
            setCollapsed((prev) => !prev);

            await handleShowLogo(collapsed);
          }}
        >
          <div className="menu-sider-header">
            <NavLink
              to={path.main}
              className="menu-sider-header__logo"
            >
              <img
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>
          <div className="indent" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              userAdmin && (
                <Menu.Item key={locale.menu.users}>
                  <UserOutlined />
                  <span>{locale.menu.users}</span>
                  <NavLink to={path.users} />
                </Menu.Item>
              )
            }
            <Menu.Item key={locale.menu.contacts}>
              <ReadOutlined />
              <span>{locale.menu.contacts}</span>
              <NavLink to={path.contacts} />
            </Menu.Item>
            <Menu.Item key={locale.menu.docs}>
              <FileOutlined />
              <span>{locale.menu.docs}</span>
              <NavLink to={path.docs} />
            </Menu.Item>
          </Menu>
        </Sider>
      )
    )
  );
}

export default inject(({ UserStore }) => {
  const {
    userLang,
    loggedIn,
    userAdmin,
  } = UserStore;

  return {
    userLang,
    loggedIn,
    userAdmin,
  };
})(observer(MenuSider));