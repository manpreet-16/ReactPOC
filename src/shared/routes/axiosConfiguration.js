import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

export let apiUrl = 'https://localhost:7142/'


export const apiClient = axios.create({
  baseURL : apiUrl,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//     "Access-Control-Allow-Origin": "*",
//     "Authorization" : 'Bearer ' + token
// }
})

apiClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"]= 'application/json;charset=UTF-8'
      config.headers["Access-Control-Allow-Origin"] = "*"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use((response) =>{
  const data = response?.data;
  if (data?.status && data.statusCode == 200) {
    toast.success(data.message ? data.message : 'Success');
  }
  return data.data;
},error=>{
  const notify = () => toast.error(getErrorMessage(error.response.status))
  notify()
  // return getErrorMessage(error.response.status)
  // return Promise.reject(error);
})


function getErrorMessage(error){
  let message = ''
  switch(error){
    case 204: {
      message = 'Request failed with status code 204'
      break;
    }
    case 400 : {
      message = 'Request failed with status code 400'
      break;
    }
    default : 
      message = "error"
  }
  return message;
}