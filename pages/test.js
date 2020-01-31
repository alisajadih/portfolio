import React, { Component } from "react";
import { withRouter } from "next/router";
import BaseLayout from "../components/layouts/BaseLayout";

class Test extends Component {
  static getInitialProps(context) {
    const testId = context.query.id;
    return { testId: testId };
  }

  render() {
    console.log(this.props.testId, "test id ");

    const testId = this.props.testId;

    return (
      <BaseLayout>
        <div>this is test page number {testId}</div>;
      </BaseLayout>
    );
  }
}
export default withRouter(Test);
