/* eslint-disable lines-between-class-members */
import { makeAutoObservable, runInAction } from 'mobx';

import * as UsersApi from '../utils/Api/UsersApi';

import { errorMessage, successMessage } from '../utils/constants/messages';

const {
  register,
  login,
  getUserInfo,
  editUserInfo,
  editAdminInfo,
  editUserLang,
  getAllUsers,
  editUserInfoUnderAdmin,
  delUserUnderAdmin,
  updatePassProfile,
} = UsersApi;

export default class UserStore {
  userId = '';
  userName = '';
  userEmail = '';
  userAdmin = false;
  userLang = 'RU';
  usersObj = null;
  userOneObj = null;

  loggedIn = false;
  loading = false;
  errload = '';
  successLoad = '';

  constructor() {
    makeAutoObservable(this);
  }

  handleRegister = async (name, email, password, lang, admin) => {
    this.loading = true;
    this.errload = '';

    await register({
      name,
      email,
      password,
      lang,
      admin,
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

  handleEditUserInfo = async (token, _id, name, email, lang) => {
    this.loading = true;
    this.errload = '';

    await editUserInfo(token, {
      _id,
      name,
      email,
      lang,
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

  handleEditAdminInfo = async (token, _id, name, email, admin, lang) => {
    this.loading = true;
    this.errload = '';

    await editAdminInfo(token, {
      _id,
      name,
      email,
      admin,
      lang,
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

        runInAction(() => {
          this.errload = errorMessage.serverErr;
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
          this.errload = '';
        });
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

  handleDellProfile = async (
    token,
    _id,
  ) => {
    this.errload = '';
    await delUserUnderAdmin(token, {
      _id,
    })
      .then(() => {
        console.log(successMessage.delUser);
      })
      .catch((err) => {
        console.log(err);
        runInAction(() => {
          this.errload = err.message;
        });
      });
  };

  handleUpdatePassProfile = async (
    token,
    _id,
    password,
    newPassword,
  ) => {
    this.errload = '';
    await updatePassProfile(token, {
      _id,
      password,
      newPassword,
    })
      .then(() => {
        console.log(successMessage.updatePass);
      })
      .catch((err) => {
        console.log(err);
        runInAction(() => {
          this.errload = errorMessage.serverErr;
        });
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

  handleEditUserInfoUnderAdmin = async (
    token,
    _id,
    name,
    email,
    admin,
    lang,
  ) => {
    this.loading = true;
    this.errload = '';
    this.successLoad = '';

    await editUserInfoUnderAdmin(token, {
      _id,
      name,
      email,
      admin,
      lang,
    })
      .then((res) => {
        localStorage.setItem('lang', res.lang);

        runInAction(() => {
          this.userOneObj = res;
          this.usersObj = null;
          this.successLoad = successMessage.editUser;
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

  handleDellUserUnderAdmin = async (
    token,
    _id,
  ) => {
    this.errload = '';
    await delUserUnderAdmin(token, {
      _id,
    })
      .then(() => {
        console.log(successMessage.delUser);
      })
      .catch((err) => {
        console.log(err);
        runInAction(() => {
          this.errload = err.message;
        });
      });
  };

  handleAddUserUnderAdmin = async (name, email, password, lang, admin) => {
    this.loading = true;
    this.errload = '';
    this.successLoad = '';

    await register({
      name,
      email,
      password,
      lang,
      admin,
    })
      .then(() => {
        console.log(successMessage.addUser);
        this.usersObj = null;
        this.successLoad = successMessage.addUser;
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

  setErrload = () => {
    runInAction(() => {
      this.errload = '';
    });
  };

  setSuccessLoad = () => {
    runInAction(() => {
      this.successLoad = '';
    });
  };
}
