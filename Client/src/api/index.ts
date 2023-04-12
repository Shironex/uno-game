import axios from "axios";
const BASE_URL = "http://uno-typescript-xnpw.vercel.app:3000/api/v1";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

interface IProps {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
}

export const WinApi = async ({ email, firstname, lastname, username }: IProps) => {
  const res = await axiosPublic.post("user/win", {
    email,
    firstname,
    lastname,
    username,
  });
  return res.data;
};