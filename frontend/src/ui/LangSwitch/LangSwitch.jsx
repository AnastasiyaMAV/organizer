import React from 'react';
import { inject, observer } from 'mobx-react';
import { Select } from 'antd';
import { localize } from '../../utils/constants/locales/localize';
import { langValue } from '../../utils/constants/constants';

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
      <Option value={langValue.RU} disabled={userLang === langValue.RU}>
        {langValue.RU}
      </Option>
      <Option value={langValue.EN} disabled={userLang === langValue.EN}>
        {langValue.EN}
      </Option>
      <Option value={langValue.DE} disabled={userLang === langValue.DE}>
        {langValue.DE}
      </Option>
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
