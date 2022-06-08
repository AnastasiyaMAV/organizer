import React from 'react';
import { inject, observer } from 'mobx-react';
import { Select } from 'antd';
import { localize } from '../../utils/constants/locales/localize';

const { Option } = Select;

function LangSwitch({
  userLang,
  loggedIn,
  handleGetUserInfo,
  handleEditUserLang,
  handleLangNotLogged,
}) {
  const handleLang = async (lang) => {
    if (loggedIn) {
      const token = localStorage.getItem('token');

      await handleEditUserLang(token, lang);
      await handleGetUserInfo(token);
    } else {
      localStorage.setItem('lang', lang);

      await handleLangNotLogged(lang);
      localize(lang);
    }
  };

  return (
    <Select
      value={userLang}
      onChange={(val) => handleLang(val)}
      defaultValue={userLang}
      style={{
        width: 60,
      }}
      size="small"
      bordered={false}
    >
      <Option value="RU" disabled={userLang === 'RU'}>RU</Option>
      <Option value="EN" disabled={userLang === 'EN'}>EN</Option>
      <Option value="DE" disabled={userLang === 'DE'}>DE</Option>
    </Select>
  );
}

export default inject(({ UserStore }) => {
  const {
    userLang,
    loggedIn,
    handleGetUserInfo,
    handleEditUserLang,
    handleLangNotLogged,
  } = UserStore;

  return {
    userLang,
    loggedIn,
    handleGetUserInfo,
    handleEditUserLang,
    handleLangNotLogged,
  };
})(observer(LangSwitch));