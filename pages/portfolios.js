import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";
import Link from "next/link";
import BasePage from "../components/BasePage";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Button
} from "reactstrap";
import { getPortfolios } from "../utils";
import { withRouter } from "next/router";
import withAuth from "../components/hoc/withAuth";
import { deletePortfolio } from "../utils";
import PortfolioCard from "../components/portfolios/PortfolioCard";

class Portfolios extends React.Component {
  static async getInitialProps({ req, query }) {
    // console.log('on the server')
    const isServer = !!req;
    let portfolios = [];
    if (isServer) {
      if (query.allPortfolios) {
        portfolios = query.allPortfolios;
      }
    } else {
      try {
        portfolios = await getPortfolios();
      } catch (err) {
        console.error(err);
      }
    }
    return { portfolios };
  }

  navigateToEdit = (portfolioId, e) => {
    e.stopPropagation();
    this.props.router.push(`/portfolios/${portfolioId}/edit`);
  };

  displayWarningDelete = (portfolioId, e) => {
    e.stopPropagation();
    const isConfirm = window.confirm(
      "Are You Sure You Want To Delete This Portfolio?"
    );
    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  };
  deletePortfolio = portfolioId => {
    deletePortfolio(portfolioId)
      .then(() => {
        this.props.router.push("/portfolios");
      })
      .catch(err => console.error(err));
  };

  // <Link href="/p/[id]" as={`/p/${props.id}`}></Link>   next v9
  // <Link as={`/portfolio/${p.id}`} href={`/portfolio?title=${p.title}`}> next old version
  renderPortfolios = portfolios => {
    const { isAuthenticated } = this.props.auth;
    //we can not using withAuth HOC for determine user Auth , beacase we need to show
    //him some date
    const { isSiteOwner } = this.props;

    return portfolios.map((p, index) => (
      <Col md="4" key={p._id}>
        <PortfolioCard portfolio={p}>
          {isAuthenticated && isSiteOwner && (
            <React.Fragment>
              <Button
                color="warning"
                onClick={e => this.navigateToEdit(p._id, e)}
              >
                Edit
              </Button>{" "}
              <Button
                color="danger"
                onClick={e => this.displayWarningDelete(p._id, e)}
              >
                Delete
              </Button>
            </React.Fragment>
          )}
        </PortfolioCard>
      </Col>
    ));
  };
  render() {
    const { portfolios, isSiteOwner } = this.props;
    const { isAuthenticated } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="Portfolios" className="portfolio-page">
          {isAuthenticated && isSiteOwner && (
            <Button
              color="success"
              className="mb-4"
              onClick={() => {
                this.props.router.push("/portfolioNew");
              }}
            >
              Create New Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolios);
