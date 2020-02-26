import App from "next/app";
import auth0 from "../services/auth0";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

const nameSpace = "http://localhost:3000";

function MyApp({ Component, pageProps, auth, ...rest }) {
  return <Component {...pageProps} auth={auth} {...rest} />;
}

MyApp.getInitialProps = async appContext => {
  // const isAuthenticated = process.browser
  //   ? auth0.clientAuth()
  //   : auth0.serverAuth(appContext.ctx.req);

  //secure way
  const user = process.browser
    ? await auth0.clientAuth()
    : await auth0.serverAuth(appContext.ctx.req);

  const appProps = await App.getInitialProps(appContext);

  const isSiteOwner =
    user && user[nameSpace + "/role"] === "siteOwner";
  const auth = { user, isAuthenticated: !!user };

  return { isSiteOwner, ...appProps, auth };
};

export default MyApp;
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
// calls page's `getInitialProps` and fills `appProps.pageProps`
