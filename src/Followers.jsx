import React, { useState } from "react";
import "../src/styles.css";

const Followers = () => {
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [isFollowing, setIsFollowing] = useState(true);

  // to check which function to execute
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFollowing) {
      submitNewFollow(e);
    } else {
      unfollowUser(e);
    }
    setIsFollowing(true); // reset toggle button to "Follow" after submitting the form
  };

  //  to toggle between the features
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setUser1("");
    setUser2("");
  };

  const createUser = (e) => {
    e.preventDefault();
    if (!userList.some((user) => user.name === newUser)) {
      setUserList([
        ...userList,
        { name: newUser, followers: [], following: [] }
      ]);
      setNewUser("");
    } else alert("This user already exists");
  };

  //  delelte user
  const deleteUser = (index) => {
    const updatesUserList = [...userList];
    updatesUserList.splice(index, 1);
    setUserList(updatesUserList);
  };
  const unfollowUser = (e) => {
    e.preventDefault();
    const user1Index = userList.findIndex((user) => user.name === user1);
    const user2Index = userList.findIndex((user) => user.name === user2);

    if (user1Index === -1) alert(user1 + " is not yet a user");
    else if (user2Index === -1) alert(user2 + " is not yet a user");
    else if (!userList[user1Index].following.includes(user2))
      alert(user1 + " does not follow " + user2);
    else {
      // create new objects to modify and insert into array copy
      const newUser1Obj = { ...userList[user1Index] };
      const newUser2Obj = { ...userList[user2Index] };
      newUser1Obj.following = newUser1Obj.following.filter((u) => u !== user2);
      newUser2Obj.followers = newUser2Obj.followers.filter((u) => u !== user1);
      const shallowListCopy = [...userList];
      shallowListCopy[user1Index] = newUser1Obj;
      shallowListCopy[user2Index] = newUser2Obj;
      setUserList(shallowListCopy);
      setUser1("");
      setUser2("");
    }
  };
  const submitNewFollow = (e) => {
    e.preventDefault();
    const user1Index = userList.findIndex((user) => user.name === user1);
    const user2Index = userList.findIndex((user) => user.name === user2);

    if (user1 === user2) alert(user1 + "cannot follow themselves.");
    else if (user1Index === -1) alert(user1 + " is not yet a user");
    else if (user2Index === -1) alert(user2 + " is not yet a user");
    else if (userList[user1Index].following.includes(user2))
      alert(user1 + " already follows " + user2);
    else {
      // create new objects to modify and insert into array copy
      const newUser1Obj = { ...userList[user1Index] };
      const newUser2Obj = { ...userList[user2Index] };
      newUser1Obj.following = [...newUser1Obj.following, user2];
      newUser2Obj.followers = [...newUser2Obj.followers, user1];
      const shallowListCopy = [...userList];
      shallowListCopy[user1Index] = newUser1Obj;
      shallowListCopy[user2Index] = newUser2Obj;
      setUserList(shallowListCopy);
      setUser1("");
      setUser2("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center"
      }}
    >
      <form onSubmit={createUser}>
        <input
          style={{ width: 200, margin: 30 }}
          value={newUser}
          required
          placeholder={"Enter new user"}
          onChange={(e) => setNewUser(e.target.value)}
        />
      </form>

      <h4>User List</h4>

      {userList.map((user, index) => (
        <div ClassName="list" key={index} style={{ cursor: "pointer" }}>
          <h1
            onClick={() => {
              alert(
                user.name +
                  " has " +
                  user.followers.length +
                  " followers and is following " +
                  user.following.length +
                  " people."
              );
            }}
          >
            {user.name}
          </h1>
          <button onClick={deleteUser}>delete</button>
        </div>
      ))}
      <form
        style={{ display: "flex", margin: 50, alignSelf: "center" }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ width: 100 }}
          value={user1}
          required
          onChange={(e) => setUser1(e.target.value)}
        />
        <div style={{ margin: "0px 10px 0px 10px" }}>
          {" "}
          {isFollowing ? "will now follow" : "is unfollowing"}
        </div>
        <input
          style={{ width: 100 }}
          value={user2}
          required
          onChange={(e) => setUser2(e.target.value)}
        />
        <input type={"submit"} />
      </form>
      {/* Toggle button */}
      <button onClick={toggleFollow}>
        {isFollowing ? "Switch to Unfollow" : "Switch to Follow"}
      </button>
    </div>
  );
};

export default Followers;
