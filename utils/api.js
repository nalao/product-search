import axios from "axios";

export async function request(method, url, data) {
  try {
    const response = await axios({
      method,
      url,
      data
    });
    return response;
  } catch (error) {
    return error;
  }
}
