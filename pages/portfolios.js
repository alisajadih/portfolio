import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";
import Link from "next/link";
import BasePage from "../components/BasePage";

class Portfolios extends React.Component {
  static async getInitialProps() {
    let posts = [];
    try {
      let res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      posts = await res.data;
    } catch (e) {
      console.log(e);
    }
    console.log(posts);
    return { posts: posts.splice(0, 10) };
  }

  // <Link href="/p/[id]" as={`/p/${props.id}`}></Link>   next v9
  // <Link as={`/portfolio/${p.id}`} href={`/portfolio?title=${p.title}`}> next old version
  renderPosts = posts => {
    return posts.map(p => (
      <li key={p.id}>
        <Link as={`/portfolio/${p.id}`} href="/portfolio/[id]">
          <a>{p.title}</a>
        </Link>
        {/* <Link
          as={`/portfolio/${p.id}`}
          href={`/portfolio?id=${p.id}`}
        >
          <a>{p.title}</a>
        </Link> */}
      </li>
    ));
  };
  render() {
    const { posts } = this.props;
    console.log(posts, "in rede3r");

    return (
      <BaseLayout>
        <BasePage>
          <div>im Portfolios page ...</div>
          <ul>{this.renderPosts(posts)}</ul>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
