import { createLens } from "mobconx";
// array
export const friendsLens = createLens("userStore.friends", false);
// computed
export const bestFriendLens = createLens("userStore.bestFriend", true);
// map
export const hobbiesLens = createLens("userStore.hobbies", false);
