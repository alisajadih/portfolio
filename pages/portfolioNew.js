import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import PortfolioNewForm from "../components/portfolios/portfolioNewForm";
import { Col, Row } from "reactstrap";
import { createPortfolio } from "../utils";
import { withRouter } from "next/router";
const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: new Date(),
  endDate: new Date()
};

class CreatePortfolio extends React.Component {
  state = {
    error: undefined
  };
  savePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    createPortfolio(portfolioData)
      .then(portfolio => {
        setSubmitting(false);
        this.props.router.push("/portfolios");
      })

      .catch(err => {
        console.log(err);
        const error = err.message || "Server Error";
        setSubmitting(false);
        this.setState({ error });
      });
  };
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioNewForm
                initialValues={INITIAL_VALUES}
                onSubmit={this.savePortfolio}
                error={this.state.error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(withAuth("siteOwner")(CreatePortfolio));
