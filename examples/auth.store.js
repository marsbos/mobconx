import { action, decorate, observable } from "mobx";

export class AuthStore {
  session;
  constructor(store) {
    this.store = store;
    this.session = "";
  }

  login = action(() => {
    this.session = `MySessionId: ${Math.random() * 100}`;
  });
}

decorate(AuthStore, {
  session: observable,
});
