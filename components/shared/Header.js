import React, { Component } from "react";
import Link from "next/link";
import { Link as NextLink } from "../../routes";
import "../../styles/main.scss";

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="customeElementFromFile">
          this is custome element
        </p>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/portfolios">
          <a>Portfolios</a>
        </Link>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <NextLink route="test" params={{ id: "1" }}>
          <a>test 1</a>
        </NextLink>
        <NextLink route="test" params={{ id: "2" }}>
          <a>test 2</a>
        </NextLink>
      </React.Fragment>
    );
  }
}
