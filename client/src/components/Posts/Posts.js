import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getPosts } from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";
import Post from "../Post/Post";

const Posts = ({ posts, error, getPosts }) => {
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (
      <div>
        <h2>Ошибка</h2>
        <Link to="/">Перейдите на главную страницу</Link>
      </div>
    );
  }

  if (!posts) {
    return <Spinner />;
  }

  return (
    <div>
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
    error: state.postReducer.error,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
