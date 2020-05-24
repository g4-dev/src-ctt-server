import {
  //getAll,
  //getDetails,
  add,
  //update,
  //remove,
} from "../controllers/transcript/index.ts";

export default (router: any) => {
  router
    //.get("/transcripts", getAll)
    //.get("/transcripts/:id", getDetails)
    .post("/transcripts", add);
  //.put("/transcripts/:id", update)
  //.delete("/transcripts/:id", remove);

  return router;
};
