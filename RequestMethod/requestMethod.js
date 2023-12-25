import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://it4788.catan.io.vn/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const TokenRequest = axios.create({
  baseURL: BASE_URL,
});
