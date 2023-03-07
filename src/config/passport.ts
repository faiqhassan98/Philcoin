import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { AdminModel } from "../module/admin";
import { UserModel } from "../module/users";

const jwtOpts: StrategyOptions = {
  // Tell passport to take the jwt token from the Authorization headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTKEY || "l8pDoCdM2QfAqPFw",
};

export default new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user$ = await UserModel.findOne({
      _id: payload,
    });
    const admin$ = await AdminModel.findOne({
      _id: payload,
    });
    if (user$ || admin$) {
      done(null, user$ || admin$);
    } else {
      done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
});
