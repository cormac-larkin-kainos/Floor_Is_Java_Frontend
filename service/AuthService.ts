import axios from 'axios';
import { Login } from '../model/Auth';

export default class AuthService{

  private URL: string = process.env.API_URL;

  constructor(){
    if(!this.URL){
      throw new Error('API_ENV ENVIRONMENT NOT SET');
    }
  }

  login = async function (login: Login): Promise <string>{
    try {
      const response = await axios.post(this.URL + 'login', login);
      return response.data;
    } catch (e) {
      console.log(e);
      if(!e.response) {
        throw new Error("Could not attempt to login")
      }
      throw new Error('Invalid Login credentials');
    }
  };
}
