import * as dotenv from 'dotenv';
dotenv.config();
import { Job } from '../model/Job';
import axios from 'axios';
axios.defaults.baseURL = process.env.API_URL;


export default class JobService {

  URL: string = 'http://localhost:8080/api/jobs';

  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(this.URL);
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      throw new Error('Could not get jobs');
    }
  }  
}