export const ExampleComponent = ({ friends, myBestFriend, addFriend }) => {
  return (
    <>
      <h3>My best friend: {myBestFriend}</h3>
      {friends && friends.map((f, i) => <p key={i}>Friend: {f}</p>)}
      <button
        onClick={() =>
          addFriend(`my new friend-${Math.round(Math.random() * 100)}`)
        }
      >
        Add a friend
      </button>
    </>
  );
};
ExampleComponent.displayName = "ExampleView";
