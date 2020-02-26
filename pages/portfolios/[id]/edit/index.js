import React from "react";
import { Col, Row } from "reactstrap";
import PortfolioNewForm from "../../../../components/portfolios/PortfolioNewForm";

import { withRouter } from "next/router";
import { updatePortfolio, getPortfolioById } from "../../../../utils";
import BaseLayout from "../../../../components/layouts/BaseLayout";
import BasePage from "../../../../components/BasePage";
import withAuth from "../../../../components/hoc/withAuth";

class EditPortfolio extends React.Component {
  static async getInitialProps({ query }) {
    let portfolio = {};
    try {
      portfolio = await getPortfolioById(query.id);
    } catch (err) {
      console.error(err);
    }
    console.log(portfolio);
    return { portfolio };
  }

  state = {
    error: undefined
  };
  updatePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    updatePortfolio(portfolioData)
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
          title="Update Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioNewForm
                initialValues={this.props.portfolio}
                onSubmit={this.updatePortfolio}
                error={this.state.error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(withAuth("siteOwner")(EditPortfolio));
