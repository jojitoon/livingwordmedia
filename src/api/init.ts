import axios from 'axios';
import {BASE_URL} from '../utils/contants';

export const ApiCaller = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
