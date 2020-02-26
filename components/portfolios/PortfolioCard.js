import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import PortfolioCardDetail from "./PortfolioCardDetail";

export default class PortfolioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { portfolio, children } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <span onClick={this.handleToggle}>
          <PortfolioCardDetail
            portfolio={portfolio}
            toggle={this.handleToggle}
            isOpen={isOpen}
          />
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              {portfolio.position}
            </CardHeader>

            <CardBody>
              <p className="portfolio-card-city">
                {portfolio.location}
              </p>
              <CardTitle className="portfolio-card-title">
                {portfolio.title}
              </CardTitle>
              <CardText className="portfolio-card-text">
                {portfolio.description}
              </CardText>
              <div className="readMore">{children}</div>
            </CardBody>
          </Card>
        </span>
      </React.Fragment>
    );
  }
}
