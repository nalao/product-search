import { request } from "./api";

const HOSTNAME = "http://localhost:3000";
export function index() {
  const url = `${HOSTNAME}/api/all`;
  return request("get", url, {}, true);
}

export function show(id) {
  const url = `${HOSTNAME}/api/get-by-id/${id}`;
  return request("get", url, {}, true);
}

export function create(pro_id, name, price, price_send, qty, ccy) {
  const url = `${HOSTNAME}/api/add`;
  return request(
    "post",
    url,
    {
      pro_id,
      name,
      price,
      price_send,
      qty,
      ccy
    },
    true
  );
}

export function update(pro_id, name, price, price_send, qty, ccy) {
  const url = `${HOSTNAME}/api/edit`;
  return request(
    "put",
    url,
    {
      pro_id,
      name,
      price,
      price_send,
      qty,
      ccy
    },
    true
  );
}

export function sale(pro_id, qty) {
  const url = `${HOSTNAME}/api/sale`;
  return request(
    "put",
    url,
    {
      pro_id,
      qty
    },
    true
  );
}

export function destroy(id) {
  const url = `${HOSTNAME}/api/delete/${id}`;
  return request("delete", url, {}, true);
}
