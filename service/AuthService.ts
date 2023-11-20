import axios from 'axios';
import { Login } from '../model/Auth';
export default class AuthService{

  login = async function (login: Login): Promise <string>{
    try {
      const response = await axios.post('/login', login);
      return response.data;
    } catch (e) {
      throw new Error('Invalid Login credentials');
    }
  };
}
