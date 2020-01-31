

import React from "react";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import Link from "next/link";
const BsNavLink = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

export default class Header extends React.Component {
  render() {
    return (
      <Navbar
        color="trasparent"
        dark
        expand="md"
        className="port-navbar port-default absolute"
      >
        <NavbarBrand
          href="/"
          className="port-navbar-brand"
        >{`Sed Ali :)`}</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="port-navbar-item">
            <BsNavLink route="/" title="Home" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink route="/about" title="About" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink route="/portfolios" title="Portfolios" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink route="/blogs" title="blogs" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink route="/cv" title="CV" />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
