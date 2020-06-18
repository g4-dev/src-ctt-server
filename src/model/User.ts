import { Model, DataTypes } from "../deps.ts";
import { bcrypt, makeJwt, setExpiration, Jose, Payload } from "../deps.ts";
import { nanoid } from "../deps.ts";
import { JwtConfig } from "../config/jwt.ts";

export interface IUser {
  name: string;
  token: string;
  master?: boolean;
}

export class User extends Model {
  static table = "user";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      ...DataTypes.string(20),
      allowNull: true,
    },
    token: DataTypes.STRING,
    master: DataTypes.BOOLEAN,
  };

  static defaults = {
    id: nanoid(),
    master: false,
  };

  static generateJwt(id: string) {
    const payload: Payload = {
      id,
      exp: setExpiration(JwtConfig.expirationTime),
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
