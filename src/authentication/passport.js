import passport from "passport";
import passportHttp from "passport-http";

const { BasicStrategy } = passportHttp;

passport.use(
  new BasicStrategy(function (username, password, done) {
    username == process.env.AUTH_USERNAME &&
    password == process.env.AUTH_PASSWORD
      ? done(null, { username, password })
      : done(null, false);
  })
);

export default passport;
