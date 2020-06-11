import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";
import Post from "../Post/Post";
import { Link } from "react-router-dom";

const Posts = ({ posts, error, getPosts }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  console.log(posts);
  

  if (error) {
    return (
      <div>
        <h2>Ошибка</h2>
        <Link to='/' >Перейдите на главную страницу</Link>
      </div>
    )
  }

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
    error: state.postReducer.error
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
