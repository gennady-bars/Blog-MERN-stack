import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";
import Post from "../Post/Post";

const Posts = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (!posts) {
    return <Spinner />;
  }
  return (
    <div>
        {posts.map((post) => {
            return <Post post={post} key={post._id} />
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
