import {
  request
} from "./api";

const HOSTNAME = "http://localhost:3000";
export function index() {
  const url = `${HOSTNAME}/api/all`;
  return request("get", url, {}, true);
}

export function show(id) {
  const url = `${HOSTNAME}/api/get-by-id/${id}`;
  return request("get", url, {}, true);
}

export function create(pro_id, name, price) {
  const url = `${HOSTNAME}/api/add`;
  return request(
    "post",
    url, {
      pro_id,
      name,
      price
    },
    true
  );
}

export function update(id, title, body) {
  const url = `${HOSTNAME}/api/v1/user/blogs/${id}`;
  return request(
    "put",
    url, {
      blog: {
        title,
        body
      }
    },
    true
  );
}

export function destroy(id) {
  const url = `${HOSTNAME}/api/v1/user/blogs/${id}`;
  return request("delete", url, {}, true);
}
