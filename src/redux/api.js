import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
export const signIn = (formdate) => API.post('/users/signin', formdate);
export const signUp = (formdate) => API.post('/users/signup', formdate);
