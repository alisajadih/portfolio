import auth0 from "auth0-js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-8iifivmp.auth0.com",
      clientID: "XM0CEpwgoyx3SjSLkSCjaSig5mxLf6Cn",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  handleAuthentication = () => {
    return new Promise((res, rej) => {
      this.auth0.parseHash((err, authResult) => {
        if (
          authResult &&
          authResult.accessToken &&
          authResult.idToken
        ) {
          this.setSession(authResult);
          res();
        } else if (err) {
          console.log(err);
          rej();
        }
      });
    });
  };

  setSession = authResult => {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    Cookies.set("user", authResult.idTokenPayload);
    Cookies.set("jwt", authResult.idToken);
    Cookies.set("expiresAt", expiresAt);
  };

  logout = () => {
    Cookies.remove("user");
    Cookies.remove("jwt");
    Cookies.remove("expiresAt");
    this.auth0.logout({
      returnTo: "",
      clientID: "XM0CEpwgoyx3SjSLkSCjaSig5mxLf6Cn"
    });
  };

  isAuthenticated = () => {
    let expiresAt = Cookies.getJSON("expiresAt");
    return new Date().getTime() < expiresAt;
  };

  getJWKS = async () => {
    const res = await axios.get(
      "https://dev-8iifivmp.auth0.com/.well-known/jwks.json"
    );
    const jwks = await res.data;
    return jwks;
  };

  //this function is implemented cause of secure reasones , we wanan get expire time from jwt
  verifyToken = async token => {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true }); // {complete : true } that means i wanna whole jwt token {header , payload ,signiture}
      if(!decodedToken) {return undefined}
      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];
      //build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }
    return undefined;
  };
  clientAuth = async () => {
    //secure way
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;

    //check in browser
    // return this.isAuthenticated();
  };
  serverAuth = async req => {
    //secure way

    if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!tokenCookie) {
        return undefined;
      }
      const token = tokenCookie.split("=")[1];
      const verifiedToken = await  this.verifyToken(token);
      return verifiedToken;
    }
    return undefined;

    //check on server p
    // if (req.headers.cookie) {
    //   const expiresAtCookie = req.headers.cookie
    //     .split(";")
    //     .find(c => c.trim().startsWith("expiresAt="));
    //   if (!expiresAtCookie) {
    //     return undefined;
    //   }
    //   const expiresAt = expiresAtCookie.split("=")[1];
    //   return new Date().getTime() < expiresAt;
    // }
  };

  login = () => {
    this.auth0.authorize();
  };
}
const auth0Client = new Auth0();
export default auth0Client;
