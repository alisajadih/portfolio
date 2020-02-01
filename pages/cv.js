import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

class CV extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <div>im CV page...</div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default CV;
