import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

class Blogs extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <div>im Blog page...</div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Blogs;
