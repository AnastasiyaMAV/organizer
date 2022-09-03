/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import UserStore from './UserStore';

class RootStore {
  constructor() {
  }

  UserStore = new UserStore();
}

const store = new RootStore();

export default store;
