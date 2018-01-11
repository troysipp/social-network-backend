// module.exports = {
//   jwtSecret: "thisisasecretkey",
//   jwtSession: {
//     session: false
//   }
// };

module.exports = {
  secret: "thisisasecretkey",
  database: "mongodb://localhost:3000",
  port: process.env.PORT || 3000
};
