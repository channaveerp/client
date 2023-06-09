import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
export const signIn = (formdate) => API.post('/users/signin', formdate);
export const signUp = (formdate) => API.post('/users/signup', formdate);
export const googleSignIn = (result) => API.post('/users/googleSignIn', result);
export const createTour = (tourData) => API.post('/tour', tourData);
export const getAllTour = (tourData) => API.get('/tour', tourData);
