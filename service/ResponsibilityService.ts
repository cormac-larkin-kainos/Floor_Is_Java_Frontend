import * as dotenv from 'dotenv';
dotenv.config();
import { Responsibility } from '../model/Responsibility';
import axios from 'axios';
axios.defaults.baseURL = process.env.API_URL;


export default class ResponsibilityService {

  URL: string = '/job-spec'; 

  async getResponsibilitiesForJob(): Promise<Responsibility[]>{
    try{
      const response = await axios.get(this.URL);
      const responsibilities: Responsibility[] = response.data;
    
      return responsibilities;
    } catch(e) {
      throw new Error('Could not get responsibilities');
    }
  }  
}