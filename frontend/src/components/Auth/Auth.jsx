import React from 'react';
import { inject, observer } from 'mobx-react';

import './Auth.scss';

const Auth = ({ title, children, errload }) => (
  <section className="auth">
    <div className="auth__container">
      <h2 className="auth__title">{title}</h2>

      {children}
    </div>

    {errload && <div className="auth__errload">{errload}</div>}
  </section>
);

export default inject(({ UserStore }) => {
  const { errload } = UserStore;

  return {
    errload,
  };
})(observer(Auth));
