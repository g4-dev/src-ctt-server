interface Post {
  request: any;
  response: any;
}

interface Get {
  params: any;
  response: any;
}

interface Delete extends Get {}

interface All {
  response: any;
}

interface Put extends Post, Get {}

export { All, Get, Post, Put, Delete };
