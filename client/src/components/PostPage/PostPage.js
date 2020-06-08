import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";

const PostPage = ({ post, getPost, match }) => {
  console.log(post, getPost, match);
  
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!post) return <Spinner />;

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    post: state.postReducer.post,
  };
}

export default connect(mapStateToProps, { getPost })(PostPage);
