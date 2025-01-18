import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";
// const BASE_URL = `/api/v1`;

import { AxiosError } from "axios";

export type ApiError = AxiosError<{ message: string }>;

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
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
}

export const RegisterAPI = async ({ id,email, firstname, lastname, username }: IProps) => {
  const res = await axiosPublic.post("user/register", {
    id,
    email,
    firstname,
    lastname,
    username,
  });
  return res.data;
};

export const BalanceAPI = async (id: string) => {
  const res = await axiosPublic.get(`user/check-balance/${id}`);
  return res.data;
};

export const RemoveBalanceAPI = async ({ id, coins }: {id: string,coins: number}) => {
  const res = await axiosPublic.post("user/remove-balance", {
    id,
    coins
  });
  return res.data;
};