import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
// import { getSecureData } from "../utils";

class Secret extends React.Component {
  static async getInitialProps({ req }) {
    console.log('secret page')
    const secureData = await getSecureData(req);
    return { secureData };
  }

  state = {
    secretData: []
  };
  async componentDidMount() {
    const secureData = await getSecureData();
    this.setState({
      secretData: secureData
    });
  }

  renderSecretData = () => {
    return this.state.secretData.map(sd => (
      <>
        <h5> {sd.title} </h5>
        <p>{sd.description} </p>
      </>
    ));
  };

  render() {
    debugger;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>This is protected page ...</h1>
          <p>you are logged in !!</p>
          {/* <h1>{secretValue}</h1> */}
          {this.renderSecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth()(Secret);
