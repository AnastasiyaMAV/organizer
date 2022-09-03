import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ReadOutlined, FileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { path } from '../../utils/constants/constants';
import { localize } from '../../utils/constants/locales/localize';
import './MenuSider.scss';
import logo from '../../assets/images/logo.png';

const { Sider } = Layout;

const MenuSider = ({
  userLang,
  loggedIn,
  userAdmin,

  handleShowLogo,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const locale = localize(userLang);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    userAdmin
      && getItem(
        <NavLink to={path.users}>{locale.menu.users}</NavLink>,
        '1',
        <UserOutlined />,
      ),
    getItem(
      <NavLink to={path.contacts}>{locale.menu.contacts}</NavLink>,
      '2',
      <ReadOutlined />,
    ),
    getItem(
      <NavLink to={path.docs}>{locale.menu.docs}</NavLink>,
      '3',
      <FileOutlined />,
    ),
  ];

  return (
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
          <NavLink to={path.main} className="menu-sider-header__logo">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="indent" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
    )
  );
};

export default inject(({ UserStore }) => {
  const { userLang, loggedIn, userAdmin } = UserStore;

  return {
    userLang,
    loggedIn,
    userAdmin,
  };
})(observer(MenuSider));
