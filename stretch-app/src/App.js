import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// action
import { fetchData } from "./actions";

// styles
import "./App.css";

function App(props) {
  const { fetchData, data } = props;
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      {data.length !== 0 ? (
        data.map(post => {
          return (
            <div className="post-container">
              <h2>{post.title}</h2>
              <p>{post.contents}</p>
            </div>
          );
        })
      ) : (
        <h2>No Data</h2>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.postReducer.data
  };
};

export default connect(mapStateToProps, { fetchData })(App);
