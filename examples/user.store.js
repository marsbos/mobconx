import { action, decorate, extendObservable, observable, computed } from "mobx";

export class UserStore {
  friends;
  profile;
  hobbies;

  constructor(store) {
    this.store = store;
    this.friends = ["Jimbob", "Mary", "Ben"];
    this.profile = {};
    extendObservable(this.profile, {
      user: {
        name: "",
      },
    });
    this.hobbies = new Map([["tennis", true]]);
  }

  get bestFriend() {
    return this.friends ? this.friends[0] : "";
  }
  setHobbyAdd = action(() => {
    this.hobbies.set("hockey", true);
  });
  setHobbyUpdate = action(() => {
    this.hobbies.set("hockey", false);
  });
  setHobbyDel = action(() => {
    this.hobbies.delete("tennis");
  });

  setProfileSet = action((value) => {
    this.profile.user = { name: value };
  });
  setProfileMutate = action((value) => {
    this.profile.user.name = value;
  });
  addFriendMutate = action((name) => {
    this.friends.push(name);
  });
  setFriendMutate = action(() => {
    this.friends[0] = "Jimbob";
  });
  addFriendImmutable = action((name) => {
    this.friends = [...this.friends, name];
  });
}

decorate(UserStore, {
  profile: observable,
  friends: observable,
  hobbies: observable,
  bestFriend: computed,
});
