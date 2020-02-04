import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";
import Link from "next/link";
import BasePage from "../components/BasePage";
import { Row, Card, CardHeader, CardBody, CardTitle, CardText, Col } from "reactstrap";

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
    return { posts: posts.splice(0, 10) };
  }

  // <Link href="/p/[id]" as={`/p/${props.id}`}></Link>   next v9
  // <Link as={`/portfolio/${p.id}`} href={`/portfolio?title=${p.title}`}> next old version
  renderPosts = posts => {
    return posts.map((p,index) => (
      <Col md="4">
        <React.Fragment key={index}>
          <span>
            <Card className="portfolio-card">
              <CardHeader className="portfolio-card-header">
                Some Position {index}
              </CardHeader>
              <CardBody>
                <p className="portfolio-card-city">
                  {" "}
                  Some Location {index}{" "}
                </p>
                <CardTitle className="portfolio-card-title">
                  Some Company {index}
                </CardTitle>
                <CardText className="portfolio-card-text">
                  Some Description {index}
                </CardText>
                <div className="readMore"> </div>
              </CardBody>
            </Card>
          </span>
        </React.Fragment>
      </Col>
    ));
  };
  render() {
    const { posts } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="Portfolios" className="portfolio-page">
          <Row>{this.renderPosts(posts)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
