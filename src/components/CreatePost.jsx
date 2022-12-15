import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";

const CreatePost = () => {
  const [PostId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const [PostText, setPostText] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [PostPic, setPostPic] = useState("");

  useEffect(() => {
    //now fetch only users from your running server...

    const getPost = async () => {
      const postFromServer = await fetchPost();

      setPosts(postFromServer);
    };

    getPost();
  }, []);

  const fetchPost = async () => {
    const res = await fetch("http://localhost:5000/posts");

    const data = await res.json();

    return data;
  };

  const addData = async (user) => {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await res.json();

    setPosts([...posts, data]);
  };

  return (
    <div>
      <>
        <Header />
        <form
          id="CreatePosts"
          onSubmit={() => addData({ PostId, profilepic, PostText, PostPic })}
        >
          <h3>Posts</h3>
          <input
            type="text"
            placeholder="@Username"
            onChange={(e) => {
              setPostId(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Profile Pic URL"
            onChange={(e) => {
              setProfilePic(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Post Picture URL"
            onChange={(e) => {
              setPostPic(e.target.value);
            }}
          />

          <input type="submit" id="Submit" />
        </form>
      </>
    </div>
  );
};

export default CreatePost;
