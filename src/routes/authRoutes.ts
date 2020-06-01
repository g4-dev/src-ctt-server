import { auth } from "../controllers/authController.ts";

export default (router: any) => {
  // For registering/adding a user to the database
  /* Sample route - POST http://localhost:8000/api/auth/register
   *   request body = {"name": "yash", "email": "y@gmail.com", "password": "sup"}
   */
  router.post("/register", auth.register);

  // // For logging in a user
  // /* Sample route - POST http://localhost:8000/api/auth/login
  //  *   request body = {"email": "y@gmail.com", "password": "sup"}
  //  */
  // router.post("/login", loginUser);

  // // For getting all the users in the database
  // /* Sample route - GET http://localhost:8000/api/auth/users
  //  */
  // router.get("/users", getAllUsers);

  // // For getting a user from the database
  // /* Sample route - GET http://localhost:8000/api/auth/user?email=y@gmail.com
  //  */
  // router.get("/user", getUserByEmail);

  // // For deleting/removing a user from the database
  // /* Sample route - DELETE http://localhost:8000/api/auth/user
  //  *   request body = {"email": "y@gmail.com"}
  //  */
  // router.delete("/user", deleteUser);

  return router;
};
