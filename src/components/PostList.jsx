import { useEffect, useState } from "react";
import Post from "./Post";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const [postList, setPostlist] = useState([]);

  // Handling Loading State
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", signal)
      .then((res) => res.json())
      .then((data) => {
        setPostlist(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("cleaning up UseEffect");
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching &&
        postList.map((post) => (
          <Post
            key={post.id}
            post={post}
            postList={postList}
            setPostlist={setPostlist}
          />
        ))}
    </>
  );
};

export default PostList;
