import { Model, DataTypes } from "../deps.ts";
import { bcrypt, makeJwt, setExpiration, Jose, Payload } from "../deps.ts";
import { nanoid } from "../deps.ts";
import { JwtConfig } from "../config/jwt.ts";

export interface IUser {
  name: string;
  token: string;
  isMasterKey: boolean;
}

export class User extends Model {
  static table = "user";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    isMasterKey: DataTypes.BOOLEAN,
  };

  static defaults = {
    id: nanoid(),
  };

  static generateJwt(id: string) {
    // Create the payload with the expiration date (token have an expiry date) and the id of current user (you can add that you want)
    const payload: Payload = {
      id,
      exp: setExpiration(new Date().getTime() + JwtConfig.expirationTime),
    };
    const header: Jose = {
      alg: JwtConfig.alg as Jose["alg"],
      typ: JwtConfig.type,
    };
    return makeJwt({ header, payload, key: JwtConfig.secretKey });
  }

  static async hashToken(token: string) {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(token, salt);
  }
}
