export const _404 = ({ response }: { response: any }) => {
  response.status = 404;
  response.body = { msg: "Not Found" };
};

export const _500 = ({ response }: { response: any }) => {
  response.status = 500;
  response.body = { msg: "Internal Error" };
};
