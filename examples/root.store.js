import { UserStore } from "./user.store";
export class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }
}
