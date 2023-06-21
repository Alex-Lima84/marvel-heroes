import axios from "axios";
import { MD5 } from 'crypto-js';

export const api = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/",
});

const privateKey: string | undefined = process.env.REACT_APP_PRIVATE_KEY;
const publicKey: string | undefined = process.env.REACT_APP_PUBLIC_KEY;

export const generateHash = () => {
  const timestamp: number = Date.now();
  const hash: string = MD5(timestamp + privateKey! + publicKey).toString();
  return {
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };
};
