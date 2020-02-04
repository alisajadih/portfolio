import React from "react";

import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import Link from "next/link";
import auth0 from "../../services/auth0";
const BsNavLink = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

const Login = () => {
  return (
    <span
      onClick={auth0.login}
      className="nav-link port-navbar-link clickable"
    >
      Login
    </span>
  );
};
const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

export default class Header extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { className } = this.props;  

    return (
      <Navbar
        color="trasparent"
        dark
        expand="md"
        className={`port-navbar port-nav-base absolute ${className}`}
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
          {/* {!auth0.isAuthenticated() ? (
            <NavItem className="port-navbar-item">
              <Login />
            </NavItem>
          ) : (
            <NavItem className="port-navbar-item">
              <Logout />
            </NavItem>
          )} */}
          {!isAuthenticated && (
            <NavItem className="port-navbar-item">
              <Login />
            </NavItem>
          )}
          {isAuthenticated && (
            <NavItem className="port-navbar-item">
              <Logout />
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}
