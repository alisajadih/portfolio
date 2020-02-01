/**
 * making a folder named as portfolio , and a js file as [id].js
 *
 * this is for next v9 for soling clear url problem :)
 *
 */

import React from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import { withRouter } from "next/router";
import axios from "axios";
import BasePage from "../../components/BasePage";

class portfolio extends React.Component {
  static async getInitialProps(context) {
    let post = {};
    let postID = context.query.id;
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postID}`
      );
      post = await res.data;
    } catch (e) {
      console.log(e);
    }
    return { post };
  }

  constructor(props) {
    super(props);
  }
  render() {
    const { post } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
          <p>{post.id}</p>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(portfolio);
