import { primitive, array } from "mobconx";
import { friendsLens, bestFriendLens } from "./lenses";

export const mapStateToProps = ({ rootStore }) => {
  return {
    friends: friendsLens(rootStore, array()),
    myBestFriend: bestFriendLens(rootStore, primitive()),
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (args) =>
      dispatch({ type: "addFriendImmutable", payload: args }),
  };
};
