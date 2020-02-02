import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const namespace = "http://localhost:3000/";

export default function(role) {
  return function(Component) {
    return class extends React.Component {
      static async getInitialProps(args) {
        const pageProps = (await Component.getInitialProps)
          ? await Component.getInitialProps(args)
          : undefined;

        return { ...pageProps };
      }

      renderProtectedPage = () => {
        const { isAuthenticated, user } = this.props.auth;
        let isAuthorized = false;
        if (user) {
          if (role && role === user[`${namespace}role`]) {
            isAuthorized = true;
          } else {
            isAuthorized = true;
          }
        }
        //user loged in but not access to this page
        if (isAuthenticated && !isAuthorized) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>
                  Sorry ! Access Denied , you dont have a permission
                  to access this page :D
                </h1>
              </BasePage>
            </BaseLayout>
          );
        }

        //user not login
        if (!isAuthenticated) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>Sorry ! Please Login to acces this page !</h1>
              </BasePage>
            </BaseLayout>
          );
        }

        //user loged in and have a permission
        if (isAuthenticated && isAuthorized) {
          return <Component {...this.props} />;
        }

        //   if (isAuthenticated) return <Component {...this.props} />;
        //   else {
        //     return (
        //       <BaseLayout {...this.props.auth}>
        //         <BasePage>
        //           <h1>Please Login to Access This Page !!</h1>
        //         </BasePage>
        //       </BaseLayout>
        //     );
        //   }
      };

      render() {
        return this.renderProtectedPage();
      }
    };
  };
}
