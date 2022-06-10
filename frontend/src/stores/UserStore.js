/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
import { makeAutoObservable, runInAction } from 'mobx';

import * as UsersApi from '../utils/Api/UsersApi';

import { errorMessage } from '../utils/constants/messages';

const {
  register,
  login,
  getUserInfo,
  editUserInfo,
  editAdminInfo,
  editUserLang,
  getAllUsers,
  editUserInfoAdmin,
} = UsersApi;

export default class UserStore {
  userName = '';
  userEmail = '';
  userAdmin = false;
  userLang = 'RU';
  usersObj = null;
  userOneObj = null;

  loggedIn = false;
  loading = false;
  errload = '';

  constructor() {
    makeAutoObservable(this);
  }

  handleRegister = async (name, email, password, lang, admin) => {
    this.loading = true;
    this.errload = '';

    await register({
      name, email, password, lang, admin,
    })
      .then((res) => {
        runInAction(() => {
          this.userName = res.name;
          this.userEmail = res.email;
        });
        this.handleLogin(this.userEmail, password);
      })
      .catch((err) => {
        console.log(err);

        runInAction(() => {
          this.errload = errorMessage.serverErr;
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  handleLogin = async (email, password) => {
    this.loading = true;
    this.errload = '';

    await login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);

        runInAction(() => {
          this.handleGetUserInfo(res.token);
        });
      })
      .catch((err) => {
        console.log(err);

        runInAction(() => {
          this.errload = errorMessage.serverErr;
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  logOut = async () => {
    localStorage.removeItem('token');

    runInAction(() => {
      this.userName = '';
      this.userEmail = '';
      this.userAdmin = false;
      this.loggedIn = false;
      this.usersObj = null;
    });
  };

  handleGetUserInfo = async (token) => {
    await getUserInfo(token)
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userId = res._id;
          this.userName = res.name;
          this.userEmail = res.email;
          this.userAdmin = res.admin;
          this.userLang = res.lang;
          this.loggedIn = true;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditUserInfo = async (token, name, email, lang) => {
    await editUserInfo(token, { name, email, lang })
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userName = res.name;
          this.userEmail = res.email;
          this.userAdmin = res.admin;
          this.userLang = res.lang;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditAdminInfo = async (token, name, email, admin, lang) => {
    await editAdminInfo(token, {
      name, email, admin, lang,
    })
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userName = res.name;
          this.userEmail = res.email;
          this.userAdmin = res.admin;
          this.userLang = res.lang;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditUserLang = async (token, lang) => {
    await editUserLang(token, { lang })
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userLang = res.lang;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLangNotLogged = (lang) => {
    runInAction(() => {
      this.userLang = lang;
    });
  };

  handleAllUsers = async (token) => {
    if (!this.usersObj) {
      await getAllUsers(token)
        .then((res) => {
          localStorage.setItem('lang', res.lang);

          runInAction(() => {
            this.usersObj = res.filter((item) => item.name !== this.userName);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleEditUserInfoAdmin = async (token, _id, name, email, lang) => {
    await editUserInfoAdmin(token, {
      _id, name, email, lang,
    })
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userOneObj = res;
          console.log(this.userOneObj);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

/*
{
    "admin": true,
    "lang": "RU",
    "_id": "623a090ab71aa1462072181f",
    "email": "mkdir-dev@email.com",
    "name": "mkdirdev"
}
*/
