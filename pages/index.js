import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Button } from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseLayout>
        <Button color='danger'>
          Danger
        </Button>
        
      </BaseLayout>
    );
  }
}

export default Index;
