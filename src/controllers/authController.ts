import { bcrypt } from "../deps.ts";
import { validateJwt } from "../deps.ts";
import { makeJwt, Jose, Payload, Where } from "../deps.ts";
import { user, UserModel } from "../model/index.ts";
import { JWT_KEY, conn } from "../config.ts";
import { Put, All, Delete, Post, Get } from "../interfaces/verbs.ts";

export const auth = {
  // For regiserting a user with the name, emailid and password
  async register({ request, response }: Post) {
    const { password } = request.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: UserModel = {
      secret: hashedPassword,
      ...request.body,
    };

    conn();
    await user.insert(newUser);

    response.status = 202; // TODO verify if it's good code
    response.body = {
      message: "Added the user successfully!",
    };
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
        const jwt_payload: Payload = {
          iss: user.email,
        };
        const jwt_header: Jose = {
          alg: "HS256",
          typ: "JWT",
        };

        const token = makeJwt({
          header: jwt_header,
          payload: jwt_payload,
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
