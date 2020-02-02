const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: "https://dev-8iifivmp.auth0.com/.well-known/jwks.json"
  }),
  audience: "XM0CEpwgoyx3SjSLkSCjaSig5mxLf6Cn", // this is clientID
  issuer: "https://dev-8iifivmp.auth0.com/", //this is domain with https:// and also should be finieshd with single slash
  algorithms: ["RS256"]
});

// for explaining what happens
// exports.checkJWT = function(req, res, next) {
//   const isValidToken = false;
//   if (isValidToken) {
//     next();
//   } else {
//     return res
//       .status(401)
//       .send({
//         title: "Not Authorized",
//         detail: "Please Login in order to get data"
//       });
//   }
// };

const namespace = "http://localhost:3000/";
exports.checkRole = role => (req, res, next) => {
  const user = req.user;
  if (user && user[namespace + "role"] === role) {
    next();
  } else {
    return res
      .status(401)
      .send({
        title: "Not Authorize",
        detail: "you are not authorized to access this data"
      });
  }
};
