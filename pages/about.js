import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

class About extends React.Component {
  render() {
    return (
      <BaseLayout>
        <BasePage className="about-page">
          <div>im about page</div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
