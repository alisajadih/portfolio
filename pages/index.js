import React from "react";
import Typed from "react-typed";
import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Col, Row } from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <BaseLayout className="cover" {...this.props.auth}>
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Front End Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated ? (
                      <strong>
                        <span style={{fontWeight:'700'}}> {user.name} </span>
                      </strong>
                    ) : null}
                    Welcome to the portfolio website of Seyed Ali
                    Sajadi. Get informed, collaborate and discover
                    projects I was working on!
                  </h1>
                </div>
                <Typed
                  className="self-typed"
                  loop
                  typeSpeed={20}
                  backSpeed={40}
                  strings={["Simple Js Lover", "React Developer"]}
                  backDelay={1000}
                  fadeOut={false}
                  fadeOutDelay={100}
                  showCursor
                  cursorChar="|"
                />

                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
