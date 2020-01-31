import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";

class Index extends React.Component {
  static async getInitialProps() {
    let userData = {};
    try {
      let res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      userData = await res.data;
    } catch (e) {
      console.log(e);
    }
    return { userData };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { userData } = this.props;
    return (
      <BaseLayout>
        <h1>this is index page </h1>
        <h3>{userData.name}</h3>
      </BaseLayout>
    );
  }
}

export default Index;
