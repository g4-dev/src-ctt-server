import { validateJwt, bcrypt, makeJwt, Jose, Payload, Where } from "../deps.ts";
import { user, UserModel } from "../model/index.ts";
import { JWT_KEY, conn } from "../config.ts";
import { Put, All, Delete, Post, Get } from "@/interfaces/index.ts";

export const auth = {
  // For regiserting a user with the name, emailid and password
  async register({ request, response }: Post) {
    let { secret, name, email, familyName, token }: UserModel = request.body;
    const salt = await bcrypt.genSalt(10);
    secret = await bcrypt.hash(secret, salt);

    let newUser = { // TODO find an efficient way of dynamic typing
      secret: secret,
      name: name,
      email: email,
      familyName: familyName,
      token: token,
    };

    console.log(newUser);
    if (!newUser) {
      response.status = 500;
      response.body = { error: "Invalid user infos" };
    } else {
      conn();
      await user.insert(newUser);
      response.status = 201;
      response.body = {
        message: "Added the user successfully!",
      };
    }
  },

  // TODO
  async updateAccount({ request, response }: Put) {},

  // For logging in a user with the emailid and password
  async login({ request, response }: Post) {
    const { email, password } = request.body;

    const loginUser: any | undefined = await user.findOne(
      Where.field("email").eq(email),
    );

    if (!loginUser) {
      response.status = 403;
      response.body = "User not found with the provided email";
    } else {
      const validPwd = await bcrypt.compare(password, user.secret);
      if (!validPwd) {
        response.status = 403;
        response.body = "Wrong password provided!";
      } else {
        const jwtPayload: Payload = {
          iss: user.email,
        };
        const jwtHeader: Jose = {
          alg: "HS256",
          typ: "JWT",
        };

        const token = makeJwt({
          header: jwtHeader,
          payload: jwtPayload,
          key: JWT_KEY,
        });

        response.status = 202;
        response.body = {
          message: "user logged in successfully!",
          token: token,
        };
      }
    }
  },

  // For getting all the users
  async getAllUsers({ response }: All) {
    const allUsers: any | undefined = await user.findAll(
      Where.field("email").notNull(),
    );

    if (!allUsers) {
      response.status = 404;
      response.body = { error: "No users found!" };
    } else {
      response.status = 200;
      response.body = allUsers;
    }
  },

  // For getting a user by email
  async getUserByEmail({ params, response }: Get) {
    const { email } = params.query;
    const fetchedUser: any | undefined = await user.findOne(
      Where.field("email").eq(email),
    );

    if (!fetchedUser || !email) {
      response.status = 403;
      response.body = { error: "No user found with the provided E-mail ID" };
    } else {
      response.status = 200;
      response.body = {
        message: "user found successfully for the provided E-mail ID!",
        user: user,
      };
    }
  },

  // For deleting a user by the email id
  async deleteUser({ params, response }: Delete) {
    const { email, id } = params.body;
    const fetchedUser: any | undefined = await user.findOne(
      Where.field("email").eq(email),
    );
    console.log(fetchedUser);

    if (!fetchedUser || (!email && !id)) {
      response.status = 404;
      response.body = { error: "No user found with the provided E-mail ID" };
    } else {
      await user.delete(Where.from({ id: id })); // TODO OR by email

      response.status = 200;
      response.body = { message: `user ${email || id} deleted successfully!` };
    }
  },
};
